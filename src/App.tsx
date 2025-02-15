import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [string, setString] = useState<string>("");
  const [svg, setSvg] = useState<string>("");
  const [current, setCurrent] = useState<number>(0);

  const randomSvg = () => {
    const rand = (count = 1) => Array.from({ length: count }, () => Math.random() * 100);
    const numCommands = Math.floor(Math.random() * 15) + 3;
    let path = `M${rand(2).join(',')}`;

    for (let i = 0; i < numCommands; i++) {
      const command = Math.random() < 0.5 ? 'L' : 'C';
      const numCoords = command === 'L' ? 2 : 6;
      const coords = rand(numCoords);
      path += ` ${command} ${coords.slice(0, 2).join(',')}`;

      if (command === 'C') {
        path += ` ${coords.slice(2, 4).join(',')} ${coords.slice(4, 6).join(',')}`;
      }
    }

    return path;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomString = Array.from({ length: 7 }, () => String.fromCharCode(33 + Math.random() * 94)).join('');

      setString(randomString);
      setSvg(randomSvg());
    }, 50)

    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <div className="nav">
        <ul>
          <li className={current == 0 ? "list active" : "list"} onClick={() => setCurrent(0)}>
            <div>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="25" height="25">
                  <path fill="white" d="M320 192l17.1 0c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4l0 4 0 32 0 192c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-140.8L280 448l56 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-144 0c-53 0-96-43-96-96l0-223.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3l0 85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5s0 0 0 0c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32c0 0 0 0 0 0c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128c0 0 0 0 0 0l0-96 0-20 0-1.3C352 4.8 356.7 .1 362.6 0l.2 0c3.3 0 6.4 1.6 8.4 4.2c0 0 0 0 0 .1L384 21.3l27.2 36.3L416 64l64 0 4.8-6.4L512 21.3 524.8 4.3c0 0 0 0 0-.1c2-2.6 5.1-4.2 8.4-4.2l.2 0C539.3 .1 544 4.8 544 10.7l0 1.3 0 20 0 96c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/>
                </svg>
              </span>
              <span className="text">Zwierzęta</span>
              <span className="circle"></span>
            </div>
          </li>

          <li className={current == 1 ? "list active" : "list"} onClick={() => setCurrent(1)}>
            <div>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="25" height="25">
                  <path fill="white" d="M210.6 5.9L62 169.4c-3.9 4.2-6 9.8-6 15.5C56 197.7 66.3 208 79.1 208l24.9 0L30.6 281.4c-4.2 4.2-6.6 10-6.6 16C24 309.9 34.1 320 46.6 320L80 320 5.4 409.5C1.9 413.7 0 419 0 424.5c0 13 10.5 23.5 23.5 23.5L192 448l0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 168.5 0c13 0 23.5-10.5 23.5-23.5c0-5.5-1.9-10.8-5.4-15L368 320l33.4 0c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L344 208l24.9 0c12.7 0 23.1-10.3 23.1-23.1c0-5.7-2.1-11.3-6-15.5L237.4 5.9C234 2.1 229.1 0 224 0s-10 2.1-13.4 5.9z"/>
                </svg>
              </span>
              <span className="text">Krajobrazy</span>
              <span className="circle"></span>
            </div>
          </li>

          <li className={current == 2 ? "list active" : "list"} onClick={() => setCurrent(2)}>
            <div>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="25" height="25">
                  <path fill="white" d="M480 48c0-26.5-21.5-48-48-48L336 0c-26.5 0-48 21.5-48 48l0 48-64 0 0-72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 72-64 0 0-72c0-13.3-10.7-24-24-24S64 10.7 64 24l0 72L48 96C21.5 96 0 117.5 0 144l0 96L0 464c0 26.5 21.5 48 48 48l256 0 32 0 96 0 160 0c26.5 0 48-21.5 48-48l0-224c0-26.5-21.5-48-48-48l-112 0 0-144zm96 320l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM240 416l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16zM128 400c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32zM560 256c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM256 176l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM112 160c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM256 304c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32zM112 320l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16zm304-48l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM400 64c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zm16 112l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16z"/>
                </svg>
              </span>
              <span className="text">Miasta</span>
              <span className="circle"></span>
            </div>
          </li>

          <li className={current == 3 ? "list active" : "list"} onClick={() => setCurrent(3)}>
            <div>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25">
                  <path fill="white" d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0l32 0c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64l32 0c123.7 0 224 100.3 224 224l0 32 0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160C100.3 320 0 219.7 0 96z"/>
                </svg>
              </span>
              <span className="text">Kwiaty</span>
              <span className="circle"></span>
            </div>
          </li>

          <li className={current == 4 ? "list active" : "list"} onClick={() => setCurrent(4)}>
            <div>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="25" height="25">
                  <path d={svg} fill="white"/>
                </svg>
              </span>
              <span className="text" style={{width: "100px"}}>{string}</span>
              <span className="circle"></span>
            </div>
          </li>
          <div className="indicator"></div>
        </ul>
      </div>
    </>
  )
}

export default App
