import { Suspense } from 'react';
import { CameraRig } from './Camera';
import { Character } from './Character';
import { PathRoad } from './Path';
import { Ground } from './Ground';
import { EducationBuilding } from '../buildings/EducationBuilding';
import { ExperienceBuilding } from '../buildings/ExperienceBuilding';
import { ProjectsBuilding } from '../buildings/ProjectsBuilding';
import { SkillsBuilding } from '../buildings/SkillsBuilding';
import { ContactBuilding } from '../buildings/ContactBuilding';
import { Mountains } from '../environment/Mountains';
import { Trees } from '../environment/Trees';
import { Clouds } from '../environment/Clouds';
import { Bridge } from '../environment/Bridge';
import { SignPosts } from '../environment/SignPosts';
import { Decorations } from '../environment/Decorations';
import { SketchPostProcessing } from '../effects/SketchPostProcessing';

export function SketchWorld() {
  return (
    <Suspense fallback={null}>
      <CameraRig />

      <ambientLight intensity={0.8} />
      <directionalLight position={[30, 50, 20]} intensity={0.6} color="#fff" />
      <hemisphereLight args={['#f5f0e8', '#d8d4cc', 0.4]} />

      <Ground />
      <PathRoad />
      <Character />

      <EducationBuilding />
      <ExperienceBuilding />
      <ProjectsBuilding />
      <SkillsBuilding />
      <ContactBuilding />

      <Mountains />
      <Trees />
      <Clouds />
      <Bridge />
      <SignPosts />
      <Decorations />

      <SketchPostProcessing />
    </Suspense>
  );
}
