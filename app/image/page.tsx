import React from 'react'
import Capture4K from '../components/Capture4K'
import GlowParticles from '../components/EffectiveBackgrounds/GlowParticles'
import Galaxy from '../components/EffectiveBackgrounds/Galaxy'


const page: React.FC = () => {
  return (
    <Capture4K fileName="my-4k-design.png">
      <Galaxy />
    </Capture4K>
  )
}

export default page