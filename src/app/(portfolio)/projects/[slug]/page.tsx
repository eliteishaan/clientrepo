import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { client, SANITY_TAGS } from '@/sanity/client';
import { projectBySlugQuery } from '@/sanity/queries/projects';

import { Breadcrumbs } from '@/components/features/projects/Breadcrumbs';
import { ProjectHeader } from '@/components/features/projects/sections/ProjectHeader';
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
    title: project.seo?.metaTitle || project.title,
    description: project.seo?.metaDescription || project.subtitle,
    // OpenGraph implementation mapping will go here
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await client.fetch(projectBySlugQuery, { slug: params.slug }, { next: { tags: [SANITY_TAGS.project] } });

  if (!project) {
    notFound();
  }

  return (
    <article className="flex flex-col w-full">
      <Breadcrumbs title={project.title} />
      <ProjectHeader project={project} />
      
      <TextSection title="Overview" content={project.overview} />
      <TextSection title="Problem Statement" content={project.problemStatement} />
      
      <ListSection title="Objectives" items={project.objectives} type="bullet" />
      <ListSection title="Constraints" items={project.constraints} type="constraint" />
      <ListSection title="Requirements" items={project.requirements} type="requirement" />
      
      <EngineeringStage label="Research" stage={project.research} />
      <EngineeringStage label="Design Decisions" stage={project.designDecisions} />
      
      <MediaGallery title="CAD & Models" media={project.cad} layout="grid" />
      
      <EngineeringStage label="Simulation" stage={project.simulation} />
      <EngineeringStage label="Fabrication" stage={project.fabrication} />
      <EngineeringStage label="Testing" stage={project.testing} />
      <EngineeringStage label="Validation" stage={project.validation} />
      
      <MetricsSection metrics={project.results} />
      <ListSection title="Lessons Learned" items={project.lessonsLearned} type="bullet" />
      
      <DownloadsList downloads={project.downloads} />
      
      {project.relatedProjects?.length > 0 && (
        <>
          <Divider />
          <RelatedProjects projects={project.relatedProjects} />
        </>
      )}
    </article>
  );
}
