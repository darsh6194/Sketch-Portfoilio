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

export function SketchWorld() {
  return (
    <Suspense fallback={null}>
      <CameraRig />

      {/* Low fill + one strong key so the cel gradientMap resolves into flat ink bands */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[28, 44, 18]} intensity={1.35} color="#fffdf7" />
      <hemisphereLight args={['#fbf7ef', '#cfc8bb', 0.3]} />

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

    </Suspense>
  );
}
