import { StyleSheet, View } from 'react-native';
import React from 'react';
import "../../threeSetup";
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, THREE } from 'expo-three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { AnimationMixer } from 'three';

const MODEL_URL = 'https://curious-pauline-catchable.ngrok-free.dev/static/3d/A.fbx';

const TestRender = () => {
    const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

        // Renderer
        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);
        renderer.setClearColor(0xaaaaaa); // light background

        // Scene + Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 20;

        // Lights
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 5, 10);
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        // ====== Load FBX Model ======
        const loader = new FBXLoader();
        loader.load(
            MODEL_URL,
            (fbx) => {
                console.log('FBX loaded:', fbx);

                // Apply scale/position
                fbx.scale.set(0.05, 0.05, 0.05); // adjust as needed
                fbx.position.set(0, -2, 0);

                scene.add(fbx);

                // Handle animation if available
                if (fbx.animations && fbx.animations.length > 0) {
                    const mixer = new AnimationMixer(fbx);
                    fbx.animations.forEach((clip) => mixer.clipAction(clip).play());
                    scene.userData.mixer = mixer;
                }
            },
            (xhr) => {
                console.log(`Loading FBX: ${(xhr.loaded / xhr.total) * 100}%`);
            },
            (error) => {
                console.error('Error loading FBX:', error);
            }
        );

        // Animation loop
        let previousTime = 0;
        const animate = (time = 0) => {
            requestAnimationFrame(animate);
            const delta = (time - previousTime) / 1000;
            previousTime = time;

            if (scene.userData.mixer) scene.userData.mixer.update(delta);
            renderer.render(scene, camera);
            gl.endFrameEXP();
        };
        animate();
    };

    return (
        <View style={styles.container}>
            <GLView style={styles.glview} onContextCreate={onContextCreate} />
        </View>
    );
};

export default TestRender;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    glview: { width: 200, height: 200 },
});
