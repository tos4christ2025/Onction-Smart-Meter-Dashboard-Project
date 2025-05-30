import React, { useRef, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';

function EnergyFlowDiagram({ data }) {
    const svgRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

    useEffect(() => {
        const handleResize = () => {
            const container = svgRef.current?.parentElement;
            if (container) {
                setDimensions({
                    width: container.clientWidth,
                    height: Math.min(400, container.clientWidth * 0.5)
                });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (svgRef.current && data && dimensions) {
            const svg = d3.select(svgRef.current)
                .attr('width', dimensions.width)
                .attr('height', dimensions.height);

            svg.selectAll('*').remove();

            const sankeyData = {
                nodes: data.nodes.map(d => ({ name: d })),
                links: data.links.map(d => ({
                    source: d.source,
                    target: d.target,
                    value: d.value
                }))
            };

            const sankeyGenerator = sankey()
                .nodeWidth(15)
                .nodePadding(10)
                .extent([[1, 1], [dimensions.width - 1, dimensions.height - 6]]);

            const { nodes, links } = sankeyGenerator(sankeyData);

            // Draw nodes
            svg.append('g')
                .selectAll('rect')
                .data(nodes)
                .join('rect')
                .attr('x', d => d.x0)
                .attr('y', d => d.y0)
                .attr('height', d => Math.max(1, d.y1 - d.y0))
                .attr('width', d => d.x1 - d.x0)
                .attr('fill', '#3b82f6')
                .append('title')
                .text(d => `${d.name}\n${d.value.toFixed(2)} kWh`);

            // Add node labels
            svg.append('g')
                .selectAll('text')
                .data(nodes)
                .join('text')
                .attr('x', d => d.x0 < dimensions.width / 2 ? d.x1 + 6 : d.x0 - 6)
                .attr('y', d => (d.y1 + d.y0) / 2)
                .attr('dy', '0.35em')
                .attr('text-anchor', d => d.x0 < dimensions.width / 2 ? 'start' : 'end')
                .text(d => `${d.name} (${d.value.toFixed(2)} kWh)`)
                .style('font-size', '12px')
                .style('fill', '#4b5563');

            // Draw links
            const link = svg.append('g')
                .selectAll('g')
                .data(links)
                .join('g')
                .style('mix-blend-mode', 'multiply');

            link.append('path')
                .attr('d', sankeyLinkHorizontal())
                .attr('stroke', '#cbd5e1')
                .attr('stroke-width', d => Math.max(1, d.width))
                .attr('fill', 'none')
                .attr('opacity', 0.5);

            link.append('title')
                .text(d => `${d.source.name} → ${d.target.name}\n${d.value.toFixed(2)} kWh`);
        }
    }, [data, dimensions]);

    return (
        <div className="card" data-name="energy-flow-diagram">
            <h3 className="text-lg font-semibold mb-4" data-name="diagram-title">Energy Flow Diagram</h3>
            <div className="energy-flow-diagram" data-name="diagram-container">
                <svg ref={svgRef} data-name="diagram-svg"></svg>
            </div>
        </div>
    );
}

export default EnergyFlowDiagram;
