'use client';
import React, { useEffect, useRef } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Spinner } from '@nextui-org/react';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';

type WorldType = {
  type: 'Topology';
  objects: {
    land: any;
    countries: any;
  };
  arcs: any;
  bbox: any;
  transform: any;
};

const Planning = () => {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const svgRef = useRef(null);

  /**
   * @description useEffect hook to render the map (only when the user is authenticated)
   */
  useEffect(() => {
    if (isLoading || (!isLoading && !isAuthenticated)) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    const projection = d3
      .geoOrthographic()
      .scale(250)
      .translate([width / 2, height / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection);

    const graticule = d3.geoGraticule();

    svg
      .append('path')
      .datum(graticule)
      .attr('class', 'graticule')
      .attr('d', path);

    d3.json('https://d3js.org/world-110m.v1.json')
      .then((fetchedJson) => {
        if (!fetchedJson) return;
        const world = fetchedJson as WorldType;
        // Render the land
        svg
          .append('path')
          .datum(topojson.feature(world, world.objects.land))
          .attr('class', 'land')
          .attr('d', path);

        // Render country boundaries
        svg
          .append('path')
          .datum(
            topojson.mesh(world, world.objects.countries, (a, b) => a !== b)
          )
          .attr('class', 'boundary')
          .attr('d', path);
      })
      .catch((error) => {
        console.error('Error loading the map data', error);
      });
  }, [isLoading, isAuthenticated]);

  if (isLoading)
    return <Spinner className="w-full h-full center" color="white" />;
  if (!isLoading && !isAuthenticated) {
    return <h1 className="center">You have to login to access this feature</h1>;
  }
  return (
    <>
      <div className="grid place-content-center m-10">
        {isLoading && <Spinner color="white" />}
        {!isLoading && !isAuthenticated && <div>you may have to login</div>}
        {isAuthenticated && (
          <div>
            <h1 className="font-bold text-2xl">Plan your next adventure!</h1>
          </div>
        )}
      </div>
      <div className="grid place-content-center z-1">
        <svg ref={svgRef} width={800} height={600} className="z-2">
          <style>
            {`
          .land {
            fill: #ccc;
            stroke: #000;
          }
          .boundary {
            fill: none;
            stroke: #333;
            stroke-width: 1.5px;
          }
          .graticule {
            fill: none;
            stroke: #777;
            stroke-width: 0.5px;
            stroke-opacity: 0.5;
          }
        `}
          </style>
        </svg>
      </div>
      <section>
        <h1>Other people shipped in this plan:</h1>
        <ul>
          <li>John Doe</li>
          <li>Jane Doe</li>
          <li>John Smith</li>
        </ul>
      </section>
    </>
  );
};

export default Planning;
