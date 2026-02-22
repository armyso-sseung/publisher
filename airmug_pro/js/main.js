(() => {
    let yOffset = 0; // ScrollY 대신 쓸 값
    let prevScrollHeight = 0; // 현재 섹션 위치 보다 이전에 위치한 섹션들의 스크롤 높이의 합
    let currentScene = 0; // 현재 섹션

    const sceneInfo = [
        {
            type: 'sticky', // 섹션 타입
            heightNum: 5, // 브라우저 높이의 몇배로 할지 결정하는 수
            scrollHeight: 0, // 섹션의 높이
            objs: {
                container: document.querySelector('#scroll-section-1'), // 섹션 DOM
                messageA: document.querySelector('#scroll-section-1 .main-message.a'), // 첫번째 타이틀 DOM
                messageB: document.querySelector('#scroll-section-1 .main-message.b'), // 드번째 타이틀 DOM
                messageC: document.querySelector('#scroll-section-1 .main-message.c'), // 세번째 타이틀 DOM
                messageD: document.querySelector('#scroll-section-1 .main-message.d'), // 네번째 타이틀 DOM
                canvas: document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                videoImages: []
            },
            values: {
                videoImageCount: 300,
                imageSequence: [0, 299],
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],

                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],

                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],

                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
            }
        },
        {
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
            }
        },
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
                messageA: document.querySelector('#scroll-section-3 .main-message.a'),
                messageB: document.querySelector('#scroll-section-3 .desc-message.b'),
                messageC: document.querySelector('#scroll-section-3 .desc-message.c'),
                pinA: document.querySelector('#scroll-section-3 .desc-message.b .pin'),
                pinB: document.querySelector('#scroll-section-3 .desc-message.c .pin'),
                canvas: document.querySelector('#video-canvas-1'),
                context: document.querySelector('#video-canvas-1').getContext('2d'),
                videoImages: [],
            },
            values: {
                videoImageCount: 960,
                imageSequence: [0, 959],
                messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
                messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
                messageC_opacity_in: [0, 1, { start: 0.9, end: 0.93 }],
                canvas_opacity_in: [0, 1, { start: 0.0, end: 0.1 }],

                messageA_translateY_in: [20, 0, { start: 0.25, end: 0.3 }],
                messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
                messageC_translateY_in: [30, 0, { start: 0.9, end: 0.93 }],

                pinA_scaleY_in: [0.5, 1, { start: 0.3, end: 0.4 }],
                pinB_scaleY_in: [0.5, 1, { start: 0.5, end: 0.6 }],

                messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
                messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
                messageC_opacity_out: [1, 0, { start: 0.95, end: 1.0 }],
                canvas_opacity_out: [1, 0, { start: 0.95, end: 1.0 }],

                messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
                messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
                messageC_translateY_out: [0, -20, { start: 0.95, end: 1.0 }],
            }
        },
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-4')
            }
        }
    ]



    const setCanvasImages = () => {
        for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
            // imgElem = document.createElement('img');
            const imgElem = new Image()
            imgElem.src = `./video/001/IMG_${6726 + i}.JPG`

            sceneInfo[0].objs.videoImages.push(imgElem)
        }

        for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
            // imgElem = document.createElement('img');
            const imgElem = new Image()
            imgElem.src = `./video/002/IMG_${7027 + i}.JPG`

            sceneInfo[2].objs.videoImages.push(imgElem)
        }
    }

    setCanvasImages()
    const setLayout = () => {
        const displayHeight = window.innerHeight

        // 섹션 높이 세팅
        sceneInfo.forEach(scene => {
            if (scene.type === 'sticky') {
                scene.scrollHeight = scene.heightNum * displayHeight
            }

            if (scene.type === 'normal') {
                scene.scrollHeight = scene.objs.container.offsetHeight
            }

            scene.objs.container.style.height = `${scene.scrollHeight}px`
        })

        // 새로고침 시 최근 섹션 유지
        yOffset = window.scrollY
        let totalScrollHeight = 0
        sceneInfo.some((scene, idx) => {
            totalScrollHeight += scene.scrollHeight
            if (totalScrollHeight >= yOffset) currentScene = idx
            return totalScrollHeight >= yOffset
        })

        // 새로고침으로 인한 최근 섹션 반영
        document.body.setAttribute('id', `show-scene-${currentScene + 1}`)

        // 이미지 대비 높이 비율
        const heightRatio = displayHeight / 1080
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`
    }

    const calcValues = (values, currentYOffset) => {
        let rv

        // 현재 섹션에 높이
        const scrollHeight = sceneInfo[currentScene].scrollHeight

        if (values.length === 3) {
            const partScrollStart = scrollHeight * values[2].start
            const partScrollEnd = scrollHeight * values[2].end
            const partScrollHeight = partScrollEnd - partScrollStart

            if (currentYOffset < partScrollStart) {
                rv = values[0]
            } else if (currentYOffset > partScrollEnd) {
                rv = values[1]
            } else {
                // 시점이 정해진 항목에 진행값
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0]
            }
        } else {
            // 현재 섹션에서 얼마나 스크롤 됐는지 비율
            const scrollRatio = currentYOffset / scrollHeight

            // 현재 스크롤 시점에 스타일 진행값
            rv = scrollRatio * (values[1] - values[0]) + values[0]
        }

        return rv
    }

    const playAnimation = () => {
        const objs = sceneInfo[currentScene].objs
        const values = sceneInfo[currentScene].values
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight

        switch (currentScene) {
            case 0:
                // 이미지 번호
                const sequence1 = Math.round(calcValues(values.imageSequence, currentYOffset))
                objs.context.drawImage(objs.videoImages[sequence1], 0, 0)

                // A Opacity
                scrollRatio < 0.22
                    ? objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset)
                    : objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset)

                // A Transform
                scrollRatio < 0.22
                    ? objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`
                    : objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`


                // B Opacity
                scrollRatio < 0.42
                    ? objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset)
                    : objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset)

                // B Transform
                scrollRatio < 0.42
                    ? objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`
                    : objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`


                // C Opacity
                scrollRatio < 0.62
                    ? objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset)
                    : objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset)

                // C Transform
                scrollRatio < 0.62
                    ? objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`
                    : objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`


                // D Opacity
                scrollRatio < 0.82
                    ? objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset)
                    : objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset)

                // D Transform
                scrollRatio < 0.82
                    ? objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`
                    : objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`

                // Canvas Opacity
                objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset)

                break;

            case 1:
                break;

            case 2:
                // 이미지 번호
                const sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset))
                objs.context.drawImage(objs.videoImages[sequence2], 0, 0)

                scrollRatio < 0.35
                    ? objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset)
                    : objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset)

                scrollRatio < 0.35
                    ? objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`
                    : objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`

                if (scrollRatio < 0.67) {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset)
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`
                    objs.pinA.style.transform = `scaleY(${calcValues(values.pinA_scaleY_in, currentYOffset)})`
                } else {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset)
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`
                }

                if (scrollRatio < 0.94) {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset)
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY_in, currentYOffset)})`
                } else {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset)
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`
                }

                scrollRatio < 0.5
                    ? objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset)
                    : objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset)

                break;

            case 3:
                break;
        }
    }

    const scrollLoop = () => {
        // 지나간 섹션 높이 합
        prevScrollHeight = 0
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight
        }

        // 스크롤을 내릴 때
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++
            document.body.setAttribute('id', `show-scene-${currentScene + 1}`)
            return
        }

        //  스크롤을 올릴 떄
        if (currentScene !== 0 && yOffset < prevScrollHeight) {
            currentScene--
            document.body.setAttribute('id', `show-scene-${currentScene + 1}`)
            return
        }

        //  효과 적용 함수
        playAnimation()
    }

    // DOM 로드 했을 떄
    // window.addEventListener('DOMContentLoaded', setLayout)

    // 리소스 로드 했을 떄
    window.addEventListener('load', () => {
        setLayout()
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0)
    })

    // 창 사이즈 변경 리스너
    window.addEventListener('resize', setLayout)

    // 스크롤 변경 리스너
    window.addEventListener('scroll', () => {
        yOffset = window.scrollY
        scrollLoop()
    })
})();