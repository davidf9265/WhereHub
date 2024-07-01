'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const OrgChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    console.log('OrgChart.tsx');
    // Define the hierarchical data for the org chart
    const treeData = {
      name: 'CEO',
      children: [
        {
          name: 'CTO',
          children: [{ name: 'Developer' }, { name: 'Tester' }],
        },
        {
          name: 'CFO',
          children: [{ name: 'Accountant' }, { name: 'Financial Analyst' }],
        },
      ],
    };

    // Set up the dimensions and margins for the SVG element
    const margin = { top: 100, right: 90, bottom: 30, left: 90 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const containerWidth = svgRef.current.parentElement.clientWidth;
    const containerHeight = svgRef.current.parentElement.clientHeight;

    console.log('containerWidth >>> ', containerWidth);

    // Create an SVG container
    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr(
        'transform',
        `translate(${containerWidth / 4}, ${containerHeight / 4})`
      );

    // Create a tree layout with the specified size
    const treemap = d3.tree().size([height, width]);

    // Convert the flat data into a hierarchy
    const root = d3.hierarchy(treeData, (d) => d.children);
    root.x0 = height / 2;
    root.y0 = 0;

    // Initialize a counter for assigning unique IDs to nodes
    let i = 0;

    // Function to update the tree structure
    const update = (source) => {
      // Assign the new tree layout to the hierarchy
      const treeData = treemap(root);

      // Get the nodes and links from the tree layout
      const nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);

      // Normalize for fixed-depth
      nodes.forEach((d) => (d.y = d.depth * 180));

      // ****************** Nodes section ***************************

      // Update the nodes
      const node = svg
        .selectAll('g.node')
        .data(nodes, (d) => d.id || (d.id = ++i));

      // Enter any new nodes at the parent's previous position
      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
        .on('click', (event, d) => click(event, d));

      // Replace rectangle with NextUI Card component
      nodeEnter
        .append('foreignObject')
        .attr('width', 120)
        .attr('height', 60)
        .attr('x', -60) // Offset to center the card
        .attr('y', -30) // Offset to center the card
        .append('xhtml:div')
        .style('width', '100%')
        .style('height', '100%')
        .html((d) => {
          return `
            <div class="flex justify-center items-center h-full bg-white rounded">
                  <div shadow className="w-full ">
                  <div>
                      <h4 class="text-center text-black">${d.data.name}</h4>
                  </div>
                  </div>
              </div>
          `;
        });

      // Update the node positions
      const nodeUpdate = nodeEnter.merge(node);

      nodeUpdate
        .transition()
        .duration(750)
        .attr('transform', (d) => `translate(${d.y},${d.x})`);

      // Update the node attributes and style
      nodeUpdate
        .select('rect')
        .attr('width', 100)
        .attr('height', 40)
        .attr('stroke', 'black')
        .attr('stroke-width', 1.5)
        .style('fill', '#fff');

      // Remove any exiting nodes
      const nodeExit = node
        .exit()
        .transition()
        .duration(750)
        .attr('transform', (d) => `translate(${source.y},${source.x})`)
        .remove();

      nodeExit
        .select('rect')
        .attr('width', 100)
        .attr('height', 40)
        .attr('stroke', 'black')
        .attr('stroke-width', 1.5)
        .style('fill', '#fff');

      // ****************** Links section ***************************

      // Update the links
      const link = svg.selectAll('path.link').data(links, (d) => d.id);

      // Enter any new links at the parent's previous position
      const linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('stroke', 'white')
        .attr('d', (d) => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal(o, o);
        });

      // Update the link positions
      linkEnter
        .merge(link)
        .transition()
        .duration(750)
        .attr('d', (d) => diagonal(d, d.parent));

      // Remove any exiting links
      link
        .exit()
        .transition()
        .duration(750)
        .attr('d', (d) => {
          const o = { x: source.x, y: source.y };
          return diagonal(o, o);
        })
        .remove();

      // Store the old positions for transition
      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      // Function to draw the links
      function diagonal(s, d) {
        return `M ${s.y} ${s.x}
                  C ${(s.y + d.y) / 2} ${s.x},
                    ${(s.y + d.y) / 2} ${d.x},
                    ${d.y} ${d.x}`;
      }

      // Toggle children on click
      function click(event, d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }
    };

    // Initialize the display to show the org chart
    update(root);
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default OrgChart;
