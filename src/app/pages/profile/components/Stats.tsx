import {StatsWidget} from "./StatsWidget.tsx";
import React, {useEffect} from "react";
import {motion, useAnimation, useInView} from "framer-motion";
import {profileStats} from "../../core/data.ts";

export const Stats = () => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, {once: true});
    const mainControls = useAnimation()
    useEffect(() => {
        if (isInView) {
            mainControls.start('visible').then(
                () => mainControls.set('hidden')
            )
        }
    }, [isInView, mainControls]);

    return (
        <div className={'row g-5 g-xl-8 mb-10'}>
            {
                profileStats.map((stat, index) => (
                    <motion.div ref={ref} className={'col-lg-3 col-md-3 col-sm-3 col-6'}
                                animate={isInView ? 'visible' : 'hidden'}
                                initial={'hidden'}
                                variants={{
                                    hidden: {scale: 0, opacity: 0, y: 50},
                                    visible: {scale: 1, opacity: 1, y: 0},
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 15,
                                    delay: index * 0.15,
                                    duration: 0.5,
                                    ease: "linear",
                                }}
                    >
                        <StatsWidget
                            className={''}
                            title={stat.title}
                            value={stat.value}
                            color={stat.color}
                            key={`${stat.title}-${index}`}
                        />
                    </motion.div>
                ))
            }
        </div>
    );
};
