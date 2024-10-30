import Text from './Text';
import { motion } from 'framer-motion';
import { colors } from 'src/styles/colorPalette';

const LoadingDots = () => {
  const dropAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.5,
        duration: 0.9,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatDelay: 1.2,
      },
    }),
  };

  return (
    <div
      style={{
        height: '100vh',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          custom={i} // 각 동그라미에 인덱스를 전달
          variants={dropAnimation}
          initial="hidden"
          animate="visible"
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: `${colors.blue}`,
          }}
          transition={{
            delay: i * 0.3,
          }}
        />
      ))}
      <Text typography="t2" color={colors.blue}>
        Loading
      </Text>
    </div>
  );
};

export default LoadingDots;
