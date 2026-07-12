import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { client, SANITY_TAGS } from '@/sanity/client';
import { projectBySlugQuery } from '@/sanity/queries/projects';

import { ProjectHeader } from '@/components/features/projects/sections/ProjectHeader';
import { ProjectNavigation } from '@/components/features/projects/ProjectNavigation';
import { TextSection } from '@/components/features/projects/sections/TextSection';
import { ListSection } from '@/components/features/projects/sections/ListSection';
import { EngineeringStage } from '@/components/features/projects/sections/EngineeringStage';
import { MetricsSection } from '@/components/features/projects/sections/MetricsSection';
import { MediaGallery } from '@/components/features/projects/sections/MediaGallery';
import { DownloadsList } from '@/components/features/projects/sections/DownloadsList';
import { RelatedProjects } from '@/components/features/projects/sections/RelatedProjects';
import { Divider } from '@/components/ui/Divider';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await client.fetch(projectBySlugQuery, { slug: params.slug }, { next: { tags: [SANITY_TAGS.project] } });
  
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.seo?.metaTitle || `${project.title} — Vivaan Portfolio`,
    description: project.seo?.metaDescription || project.subtitle,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await client.fetch(projectBySlugQuery, { slug: params.slug }, { next: { tags: [SANITY_TAGS.project] } });

  if (!project) {
    notFound();
  }

  // Generate dynamic chapters for navigation based on available content
  const chapters = [];
  if (project.overview || project.problemStatement) chapters.push({ id: 'overview', label: 'Overview' });
  if (project.objectives?.length > 0 || project.constraints?.length > 0 || project.requirements?.length > 0) chapters.push({ id: 'requirements', label: 'Requirements' });
  if (project.research || project.designDecisions) chapters.push({ id: 'design', label: 'Design' });
  if (project.cad?.length > 0) chapters.push({ id: 'cad', label: 'CAD & Models' });
  if (project.simulation || project.fabrication || project.testing || project.validation) chapters.push({ id: 'engineering', label: 'Engineering' });
  if (project.results?.length > 0 || project.lessonsLearned?.length > 0) chapters.push({ id: 'results', label: 'Results' });
  if (project.downloads?.length > 0) chapters.push({ id: 'downloads', label: 'Downloads' });

  return (
    <article className="flex flex-col w-full bg-background relative">
      <ProjectHeader project={project} />
      <ProjectNavigation chapters={chapters} />
      
      {/* Content wrapper with top padding so nav doesn't cover first section if we scroll to it */}
      <div className="pt-16 pb-32">
        {chapters.find(c => c.id === 'overview') && (
          <div id="overview" className="scroll-mt-32">
            <TextSection title="Overview" content={project.overview} variant="lead" />
            <TextSection title="Problem Statement" content={project.problemStatement} />
          </div>
        )}
        
        {chapters.find(c => c.id === 'requirements') && (
          <div id="requirements" className="scroll-mt-32">
            <ListSection title="Objectives" items={project.objectives} type="bullet" />
            <ListSection title="Constraints" items={project.constraints} type="constraint" />
            <ListSection title="Requirements" items={project.requirements} type="requirement" />
          </div>
        )}
        
        {chapters.find(c => c.id === 'design') && (
          <div id="design" className="scroll-mt-32">
            <EngineeringStage label="Research" stage={project.research} />
            <EngineeringStage label="Design Decisions" stage={project.designDecisions} />
          </div>
        )}
        
        {chapters.find(c => c.id === 'cad') && (
          <div id="cad" className="scroll-mt-32">
            <MediaGallery title="CAD & Models" media={project.cad} layout="grid" />
          </div>
        )}
        
        {chapters.find(c => c.id === 'engineering') && (
          <div id="engineering" className="scroll-mt-32">
            <EngineeringStage label="Simulation" stage={project.simulation} />
            <EngineeringStage label="Fabrication" stage={project.fabrication} />
            <EngineeringStage label="Testing" stage={project.testing} />
            <EngineeringStage label="Validation" stage={project.validation} />
          </div>
        )}
        
        {chapters.find(c => c.id === 'results') && (
          <div id="results" className="scroll-mt-32">
            <MetricsSection metrics={project.results} />
            <ListSection title="Lessons Learned" items={project.lessonsLearned} type="bullet" />
          </div>
        )}
        
        {chapters.find(c => c.id === 'downloads') && (
          <div id="downloads" className="scroll-mt-32">
            <DownloadsList downloads={project.downloads} />
          </div>
        )}
        
        {project.relatedProjects?.length > 0 && (
          <div className="mt-32">
            <Divider />
            <RelatedProjects projects={project.relatedProjects} />
          </div>
        )}
      </div>
    </article>
  );
}
