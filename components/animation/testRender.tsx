import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import "../../threeSetup";
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, THREE } from 'expo-three';
import ExpoTHREE from 'expo-three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Asset } from 'expo-asset';
import { AnimationMixer } from 'three';

const TestRender = () => {
    const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

        // Renderer
        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);

        // Scene + Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000);
        camera.position.z = 18;

        // Light
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 5, 10);
        scene.add(light);

        // Load glTF
        const asset = Asset.fromModule(require('@/assets/3d/A.glb'));
        await asset.downloadAsync();

        const loader = new GLTFLoader();
        loader.load(
            asset.localUri!,
            (gltf) => {
                scene.add(gltf.scene);

                gltf.scene.scale.set(10, 10, 10);

                // Kiểm tra xem glTF có animation không
                if (gltf.animations && gltf.animations.length) {
                    const mixer = new AnimationMixer(gltf.scene);

                    gltf.animations.forEach((clip) => {
                        const action = mixer.clipAction(clip);
                        action.play();
                    });

                    scene.userData.mixer = mixer;
                }
            },
            undefined,
            (error) => {
                console.error("Error loading glTF:", error);
            }
        );

        let previousTime = 0;

        // Animation loop
        const animate = (time = 0) => {
            requestAnimationFrame(animate);

            const delta = (time - previousTime) / 1000;
            previousTime = time;

            // Update mixer nếu có
            if (scene.userData.mixer) {
                scene.userData.mixer.update(delta);
            }

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
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    glview: { width: 300, height: 300 },
});