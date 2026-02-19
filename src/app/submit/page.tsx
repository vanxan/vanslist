import { Metadata } from 'next';
import { SubmitFormContent } from './SubmitFormContent';

export const metadata: Metadata = {
  title: 'Submit to VansList',
  description: 'Share an AI tool, prompt, skill, workflow, bundle, or service with the VansList community. Free to submit — goes live instantly.',
};

export default function SubmitPage() {
  return <SubmitFormContent />;
}
