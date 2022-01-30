import capitalize from 'capitalize-sentence';
import React, { useEffect, useState } from 'react';
import { getGallery } from 'src/services/storyblokApi';
import { hexToRGB } from 'src/utils';
import Unity, { UnityContext } from "react-unity-webgl"

const unityContext = new UnityContext({
  loaderUrl:    "../unity/CubieBird/Build/CubieBird.loader.js",
  dataUrl:      "../unity/CubieBird/Build/CubieBird.data",
  frameworkUrl: "../unity/CubieBird/Build/CubieBird.framework.js",
  codeUrl:      "../unity/CubieBird/Build/CubieBird.wasm",
  // Additional configuration options.
  webglContextAttributes: {
    preserveDrawingBuffer: true,
  },
});

export default function CubiesPage() {
  const [cubies, setCubies] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getGallery();
      const { cubies } = data?.story?.content;
      if (cubies && cubies.length > 0) setCubies(cubies);
    })();
  }, []);

  const [sections, setSections] = useState([]);

  useEffect(() => {
    const _sections = [];

    for (let i = 0; i < Math.ceil(cubies.length / 5); i++) {
      const startIndex = 5 * i;
      let endIndex = startIndex + 5;
      if (endIndex > cubies.length) endIndex = undefined;

      const sectionCubies = cubies.slice(startIndex, endIndex);
      
      const section = (
        <div className="rw" key={`section-${i}`}>
          {sectionCubies.map((cbi, i) => {
            if (i == 2 || i == 4) return null;

            const generateCbi = (cubie) => {
              const hasLink = cubie.link.url !== '';
              return (
                <a
                  href={hasLink ? cubie.link.url : '#'}
                  target={hasLink ? '_blank' : '_self'}
                  className="cbi"
                  style={{ '--c': hexToRGB(cubie.color.color), 'cursor': hasLink ? 'pointer' : 'unset' }}
                  key={`cubie-${cubie._uid}`}
                >
                  <div className="badge">{capitalize(cubie.type)}</div>
                  <img src={cubie.images[0].filename} />
                  <div className="tx">
                    <span href="#">{cubie.name}</span>
                    <address></address>
                    <div className="price">{cubie.price} TRX</div>
                  </div>
                </a>
              );
            };

            if (i == 0) return generateCbi(sectionCubies[0]);

            if (i == 1) {
              return (
                <div className="cl" key={`sub-${i}`}>
                  {generateCbi(sectionCubies[1])}
                  {sectionCubies.length >= 3 && generateCbi(sectionCubies[2])}
                </div>
              );
            }

            if (i == 3) {
              return (
                <div className="cl" key={`sub-${i}`}>
                  {generateCbi(sectionCubies[3])}
                  {sectionCubies.length >= 5 && generateCbi(sectionCubies[4])}
                </div>
              );
            }
          })}
        </div>
      );

      _sections.push(section);
    }

    setSections(_sections);
  }, [cubies]);

  return (
    <>
      <Unity unityContext={unityContext} />
      <div id="cu">
        <div className="lst">
          {!sections || sections?.length == 0 ? (
            <div className="rw">

              <div className="cl">
              </div>

              <div className="cl">

              </div>
            </div>
          ) : (
            sections
          )}
        </div>
      </div>
    </>
  );
}
