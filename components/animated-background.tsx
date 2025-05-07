import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'
import { useTheme } from 'next-themes';


export default function AnimatedBackground() {
    const { theme, systemTheme } = useTheme();
    console.log(theme);
    const lightThemeColor = {
        color1: '#9dff91',
        color2: '#ffffff',
        color3: '#ffffff',
    }
    const darkThemeColor = {
        color1: '#051311',
        color2: '#000000',
        color3: '#000000',
    }
    const colors = theme === 'light' ? lightThemeColor : theme === 'dark' ? darkThemeColor : theme === 'system' ? systemTheme === 'light' ? lightThemeColor : darkThemeColor : {}
    return (
        <div className='absolute top-0 w-[100vw] h-screen'>
            {
                theme && <ShaderGradientCanvas
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    lazyLoad={false}

                    fov={100}
                    pixelDensity={1}
                    pointerEvents="auto"
                >
                    <ShaderGradient
                        animate="on"
                        type="waterPlane"
                        wireframe={false}
                        shader="defaults"
                        uTime={8}
                        uSpeed={0.3}
                        uStrength={1.5}
                        uDensity={1}
                        uFrequency={0}
                        uAmplitude={0}
                        positionX={0}
                        positionY={1}
                        positionZ={0}
                        rotationX={50}
                        rotationY={0}
                        rotationZ={-60}
                        {...colors}
                        reflection={0.1}

                        // View (camera) props
                        cAzimuthAngle={180}
                        cPolarAngle={80}
                        cDistance={2.8}
                        cameraZoom={9.1}

                        // Effect props
                        lightType="env"
                        brightness={1}
                        envPreset="city"
                        grain="off"

                        // Tool props
                        toggleAxis={false}
                        zoomOut={false}
                        hoverState=""

                        // Optional - if using transition features
                        enableTransition={false}
                    />
                </ShaderGradientCanvas>
            }

        </div>
    );
}