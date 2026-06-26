// --- 1. مصفوفة البيانات باللغة العربية ---
const wordsData = [
    { text: "حبي الأبدي", title: "حب حياتي", desc: "كلما قضينا وقتاً أطول معاً، أحببتك أكثر.", img: "image1.jpg", type: 'text' },
    { text: "", title: "أميرتي المفضلة", desc: "ستظلين دائماً سندريلا الخاصة بي وملاذي الآمن.", img: "image2.jpg", type: 'icon', iconUrl: 'icon1.jpg' }, 
    { text: "عيد ميلاد سعيد", title: "يوم مميز", desc: "اليوم نحتفل باليوم الذي أصبح فيه العالم أجمل بوجودك.", img: "image3.jpg", type: 'text' },
    { text: "", title: "حنيتي", desc: "لك، يا من تجعل قلبي ينبض بطريقة فريدة ومختلفة.", img: "image4.jpg", type: 'icon', iconUrl: 'icon2.jpg' }, 
    { text: "أنت السحر", title: "سحر خالص", desc: "كل شيء تلمسه يمتلئ بالنور والسعادة.", img: "image5.jpg", type: 'text' },
    { text: "", title: "الحب اللطيف", desc: "أنت ألطف وأجمل شخص في هذا الكون.", img: "image6.jpg", type: 'icon', iconUrl: 'icon3.jpg' }, 
    { text: "كوننا الخاص", title: "أنا وأنت", desc: "في هذا الكون الواسع، أنا محظوظ لأنني وجدتك.", img: "image7.jpg", type: 'text' },
    { text: "", title: "رفيق دربي", desc: "سنكون معاً دائماً في كل مغامرة وكل خطوة.", img: "image8.jpg", type: 'icon', iconUrl: 'icon4.jpg' }, 
    { text: "أعشقك", title: "إلى الأبد", desc: "لا يهمني كم حياة أمتلك، في كل منها سأختارك أنت.", img: "image9.jpg", type: 'text' },
    { text: "", title: "نبض قلبي", desc: "أحملك في عقلي وقلبي دائماً وأبداً.", img: "image10.jpg", type: 'icon', iconUrl: 'icon5.jpg' },
    { text: "ضحكتك تضيء كوني", title: "ابتسامتك", desc: "ضحكتك هي الموسيقى المفضلة لقلبي.", img: "image11.jpg", type: 'text' },
    { text: "", title: "نجمتي المضيئة", desc: "تلمعين في سمائي وتطردين كل الظلمات.", img: "image12.jpg", type: 'icon', iconUrl: 'icon6.jpg' },
    { text: "عالمنا الوردي", title: "أجمل حلم", desc: "معك تحولت كل الأحلام الخيالية إلى واقع أعيشه.", img: "image13.jpg", type: 'text' },
    { text: "", title: "وتيني", desc: "أنت الشريان الذي يغذي روحي بالحياة والأمل.", img: "image14.jpg", type: 'icon', iconUrl: 'icon7.jpg' },
    { text: "مكتفي بك", title: "اكتفائي التام", desc: "لم أعد بحاجة لأي شيء من هذا العالم بعد أن وجدتك.", img: "image15.jpg", type: 'text' }
];

// --- 2. إعداد المشهد والكاميرا ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.0012);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 4000);
camera.position.set(0, 0, 1800); 

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.LinearToneMapping; 
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxDistance = 1200;
controls.minDistance = 100;
controls.enabled = false; 

// --- [تعديل] ضبط التوهج ليكون ناعماً وغير مبالغ فيه ---
const renderScene = new THREE.RenderPass(scene, camera);
const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.0, 0.5, 0.2);
bloomPass.threshold = 0.15;  // رفع العتبة لتقليل التوهج العشوائي
bloomPass.strength = 1.1;   // تقليل القوة لراحة العين وإظهار التفاصيل
bloomPass.radius = 0.55;

const composer = new THREE.EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// --- 3. النجوم البعيدة في الخلفية ---
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 4500;
const starsPositions = new Float32Array(starsCount * 3);
for(let i=0; i<starsCount*3; i++) {
    starsPositions[i] = (Math.random() - 0.5) * 3500;
}
starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
const starsMaterial = new THREE.PointsMaterial({color: 0xffffff, size: 1.2, transparent: true, opacity: 0.6});
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// --- 4. بناء نفق الدخول السريع (Warp Tunnel) ---
const tunnelGroup = new THREE.Group();
scene.add(tunnelGroup);
const tunnelParticles = [];

for (let i = 0; i < 700; i++) {
    const geo = new THREE.SphereGeometry(1.0, 8, 8);
    const isWhite = Math.random() > 0.7;
    const mat = new THREE.MeshBasicMaterial({ 
        color: isWhite ? 0xffffff : 0xff1493, 
        transparent: true, 
        opacity: 0, 
        blending: THREE.AdditiveBlending 
    });
    const mesh = new THREE.Mesh(geo, mat);
    
    const angle = Math.random() * Math.PI * 2;
    const radius = 25 + Math.random() * 160; 
    const zDist = Math.random() * 2000; 
    
    mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, zDist);
    mesh.userData = { angle: angle, radius: radius, zSpeed: 16 + Math.random() * 16 };
    
    tunnelGroup.add(mesh);
    tunnelParticles.push(mesh);
}

// --- 5. الثقب الأسود في المنتصف ---
const blackHoleGeo = new THREE.CircleGeometry(25, 64);
const blackHoleMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
const blackHole = new THREE.Mesh(blackHoleGeo, blackHoleMat);
blackHole.rotation.x = -Math.PI / 2;
scene.add(blackHole);

// --- 6. القلب المشع ثلاثي الأبعاد ---
const heartGroup = new THREE.Group();
heartGroup.position.set(0, 40, 0); 
heartGroup.scale.set(0, 0, 0); 
scene.add(heartGroup);

const heartParticles = [];
const heartCount = 500;
for (let i = 0; i < heartCount; i++) {
    const t = Math.PI * 2 * (i / heartCount);
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
    const z = (Math.random() - 0.5) * 6;

    const pGeo = new THREE.SphereGeometry(0.7, 8, 8);
    const pMat = new THREE.MeshBasicMaterial({ 
        color: 0xff1493, 
        transparent: true, 
        opacity: 0.85,
        blending: THREE.AdditiveBlending 
    });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.position.set(x, y, z);
    pMesh.userData = { origX: x, origY: y, origZ: z, seed: Math.random() * 10 };
    heartGroup.add(pMesh);
    heartParticles.push(pMesh);
}

// --- 7. أذرع المجرة الحلزونية ---
const particleCount = 28000; 
const galaxyGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

const colorInside = new THREE.Color(0xff4099); 
const colorOutside = new THREE.Color(0x2b004d); 

for (let i = 0; i < particleCount; i++) {
    const r = Math.random() * 450 + 15; 
    const arms = 3;
    const armAngle = (i % arms) * ((Math.PI * 2) / arms);
    const spinAngle = r * 0.018;
    const angle = armAngle + spinAngle;

    const randomSpread = (Math.random() - 0.5) * (r * 0.12);
    
    positions[i * 3] = Math.cos(angle) * r + randomSpread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5; 
    positions[i * 3 + 2] = Math.sin(angle) * r + randomSpread;

    const mixedColor = colorInside.clone().lerp(colorOutside, r / 450);
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
}

galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const galaxyMaterial = new THREE.PointsMaterial({
    size: 1.2, 
    vertexColors: true,
    transparent: true,
    opacity: 0, 
    blending: THREE.AdditiveBlending
});
const milkyWay = new THREE.Points(galaxyGeometry, galaxyMaterial);
scene.add(milkyWay);

// --- [إضافة جديدة مكثفة] غبار كوني سديمي بين المدارات والحلقات لتبدو في الفضاء الفعلي ---
const dustGroup = new THREE.Group();
scene.add(dustGroup);

const dustCount = 12000; // جزيئات كثيفة جداً وموزعة بعناية
const dustGeometry = new THREE.BufferGeometry();
const dustPositions = new Float32Array(dustCount * 3);
const dustColors = new Float32Array(dustCount * 3);

const dustColorPink = new THREE.Color(0xff66cc);
const dustColorPurple = new THREE.Color(0x9933ff);

for(let i=0; i<dustCount; i++) {
    const r = Math.random() * 500; // ممتد لآخر المجرة
    const angle = Math.random() * Math.PI * 2;
    
    // توزيع عشوائي متموج ينتشر بين الحلقات وبارتفاعات متفاوتة (أثر ثلاثي أبعاد)
    dustPositions[i*3] = Math.cos(angle) * r + (Math.random() - 0.5) * 45;
    dustPositions[i*3+1] = (Math.random() - 0.5) * 55; // سمك الغبار الرأسي
    dustPositions[i*3+2] = Math.sin(angle) * r + (Math.random() - 0.5) * 45;
    
    // دمج ألوان الغبار ليكون سديمياً ساحراً
    const mixedDustColor = dustColorPink.clone().lerp(dustColorPurple, Math.random());
    dustColors[i*3] = mixedDustColor.r;
    dustColors[i*3+1] = mixedDustColor.g;
    dustColors[i*3+2] = mixedDustColor.b;
}
dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
dustGeometry.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

const cosmicDustMaterial = new THREE.PointsMaterial({
    size: 0.7,
    vertexColors: true,
    transparent: true,
    opacity: 0.35, // خفيف وناعم ليعطي مظهر الضباب أو السديم
    blending: THREE.AdditiveBlending
});
const cosmicDustCloud = new THREE.Points(dustGeometry, cosmicDustMaterial);
dustGroup.add(cosmicDustCloud);


// --- 8. إنشاء النصوص والصور الطافية ---
const orbitElements = [];
const orbitGroup = new THREE.Group();
scene.add(orbitGroup);

const textureLoader = new THREE.TextureLoader();

function createTextTexture(text) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 128;
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = 'Bold 44px Tahoma, Arial, sans-serif'; 
    ctx.fillStyle = '#ffffff'; 
    ctx.textAlign = 'center';
    ctx.shadowColor = '#ff1493';
    ctx.shadowBlur = 12; 
    ctx.fillText(text, canvas.width / 2, 75);
    return new THREE.CanvasTexture(canvas);
}

wordsData.forEach((data, index) => {
    const orbitRadius = THREE.MathUtils.lerp(120, 380, Math.random());
    const startAngle = (index / wordsData.length) * Math.PI * 2;
    
    let material, geometry;

    if (data.type === 'text') {
        const texture = createTextTexture(data.text);
        material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
        geometry = new THREE.PlaneGeometry(85, 22); 
    } else {
        const texture = textureLoader.load(data.iconUrl);
        material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
        geometry = new THREE.PlaneGeometry(24, 24); 
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = (Math.random() - 0.5) * 35; 
    
    mesh.userData = {
        radius: orbitRadius,
        angle: startAngle,
        speed: 0.001 + Math.random() * 0.0012,
        cardInfo: data
    };

    orbitGroup.add(mesh);
    orbitElements.push(mesh);
});

// --- 9. منطق الأنيميشن وتشغيل الأغنية ---
let isZooming = false;
let zoomProgress = 0;
let heartScaleProgress = 0; 

const bgMusic = document.getElementById('bgMusic');

document.getElementById('enterBtn').addEventListener('click', () => {
    if(bgMusic) {
        bgMusic.play().catch(e => console.log("Audio block active:", e));
    }

    const welcomeScreen = document.getElementById('welcomeScreen');
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        isZooming = true; 
    }, 1000);
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('pointerdown', (event) => {
    if (document.getElementById('welcomeScreen').style.display !== 'none' || document.getElementById('popupCard').classList.contains('active')) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(orbitElements);

    if (intersects.length > 0) {
        if(intersects[0].object.material.opacity > 0.5) {
            const info = intersects[0].object.userData.cardInfo;
            openMemoryPopup(info.title, info.desc, info.img);
        }
    }
});

function openMemoryPopup(title, text, imgSrc) {
    document.getElementById('popupTitle').innerText = title;
    document.getElementById('popupText').innerText = text;
    document.getElementById('popupImg').src = imgSrc;
    document.getElementById('popupCard').classList.add('active');
}

document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('popupCard').classList.remove('active');
});

// --- 10. حلقة التحريك والـ Rendering الفعلي ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // دوران الـ المجرة والغبار الكوني المضاف بسرعات متفاوتة لتبدو حية
    milkyWay.rotation.y = elapsedTime * 0.035;
    dustGroup.rotation.y = elapsedTime * 0.02; // دوران هادئ وسحري للغبار الكوني السديمي
    starField.rotation.y = elapsedTime * 0.003;

    // نبض جزيئات القلب 
    heartParticles.forEach(p => {
        p.position.x = p.userData.origX + Math.sin(elapsedTime * 5 + p.userData.seed) * 0.15;
        p.position.y = p.userData.origY + Math.cos(elapsedTime * 5 + p.userData.seed) * 0.15;
    });
    heartGroup.rotation.y = elapsedTime * 0.35;

    // ظهور والتحجيم التلقائي للقلب 
    if (!isZooming && zoomProgress >= 1) {
        if (heartScaleProgress < 1) {
            heartScaleProgress += 0.015; 
        }
        const currentScale = THREE.MathUtils.lerp(0, 1.1, heartScaleProgress);
        const pulse = currentScale + Math.sin(elapsedTime * 3.5) * (0.06 * currentScale);
        heartGroup.scale.set(pulse, pulse, pulse);
    } else {
        heartGroup.scale.set(0, 0, 0);
    }

    // دوران وحركة العناصر الطافية 
    orbitElements.forEach(mesh => {
        mesh.userData.angle -= mesh.userData.speed;
        mesh.position.x = Math.cos(mesh.userData.angle) * mesh.userData.radius;
        mesh.position.z = Math.sin(mesh.userData.angle) * mesh.userData.radius;
        mesh.position.y += Math.sin(elapsedTime * 1.2 + mesh.userData.angle) * 0.03;
        mesh.lookAt(camera.position); 
    });

    // تحريك جزيئات النفق للخلف
    tunnelParticles.forEach(p => {
        p.position.z -= p.userData.zSpeed;
        if(isZooming && p.material.opacity < 0.85) p.material.opacity += 0.04;
        
        if (p.position.z < -200) {
            p.position.z = 2000;
        }
    });

    // تأثير الدخول السينمائي الـ Zoom In
    if (isZooming) {
        zoomProgress += 0.006; 
        
        camera.position.z = THREE.MathUtils.lerp(1800, 340, zoomProgress);
        camera.position.y = THREE.MathUtils.lerp(0, 220, zoomProgress); 
        camera.lookAt(0, 25, 0);

        if (zoomProgress > 0.4) {
            const fadeProgress = (zoomProgress - 0.4) * 1.6;
            galaxyMaterial.opacity = THREE.MathUtils.lerp(0, 0.8, fadeProgress);
            orbitElements.forEach(mesh => {
                mesh.material.opacity = THREE.MathUtils.lerp(0, 1, fadeProgress);
            });
        }

        if (zoomProgress >= 1) {
            isZooming = false;
            controls.enabled = true; 
            controls.target.set(0, 25, 0); 
        }
    } else if (!isZooming && zoomProgress >= 1) {
        tunnelParticles.forEach(p => {
            if (p.material.opacity > 0) p.material.opacity -= 0.02;
        });
    }

    controls.update();
    
    // الرندرة عبر الـ composer للحفاظ على تأثير التوهج الهادئ
    composer.render();
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

