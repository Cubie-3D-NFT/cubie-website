import { Skeleton } from '@chakra-ui/skeleton';
import capitalize from 'capitalize-sentence';
import React, { useEffect, useState } from 'react';
import Cubie1 from 'src/assets/images/cubies/Cubie_1_adobespark.png';
import Cubie24 from 'src/assets/images/cubies/Cubie_24_adobespark.png';
import Cubie35 from 'src/assets/images/cubies/Cubie_35_adobespark.png';
import Cubie37 from 'src/assets/images/cubies/Cubie_37_adobespark.png';
import Cubie44 from 'src/assets/images/cubies/Cubie_44_adobespark.png';
import { getGallery } from 'src/services/storyblokApi';
import { hexToRGB } from 'src/utils';

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
      <div id="cu">
        <div className="lst">
          {!sections || sections?.length == 0 ? (
            <div className="rw">
              <Skeleton rounded="md" mx="2" mt="3" mb="3.5">
                <div className="cbi">
                  <div className="badge">Badge</div>
                  <img src={Cubie37} />
                  <div className="tx">
                    <a href="#">Cubie #0</a>
                    <address>TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t</address>
                    <div className="price">0 TRX</div>
                  </div>
                </div>
              </Skeleton>

              <div className="cl">
                <Skeleton rounded="md" mx="2">
                  <div className="cbi">
                    <div className="badge">Badge</div>
                    <img src={Cubie35} alt="" />
                    <div className="tx">
                      <a href="#">Cubie #0</a>
                      <address>TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t</address>
                      <div className="price">0 TRX</div>
                    </div>
                  </div>
                </Skeleton>

                <Skeleton rounded="md" mx="2">
                  <div className="cbi">
                    <div className="badge">Badge</div>
                    <img src={Cubie24} alt="" />
                    <div className="tx">
                      <a href="#">Cubie #0</a>
                      <address>TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t</address>
                      <div className="price">0 TRX</div>
                    </div>
                  </div>
                </Skeleton>
              </div>

              <div className="cl">
                <Skeleton rounded="md" mx="2">
                  <div className="cbi">
                    <div className="badge">Badge</div>
                    <img src={Cubie44} alt="" />
                    <div className="tx">
                      <a href="#">Cubie #0</a>
                      <address>TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t</address>
                      <div className="price">0 TRX</div>
                    </div>
                  </div>
                </Skeleton>

                <Skeleton rounded="md" mx="2">
                  <div className="cbi">
                    <div className="badge">Badge</div>
                    <img src={Cubie1} alt="" />
                    <div className="tx">
                      <a href="#">Cubie #0</a>
                      <address>TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t</address>
                      <div className="price">0 TRX</div>
                    </div>
                  </div>
                </Skeleton>
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
