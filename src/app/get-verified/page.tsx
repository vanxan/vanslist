import { Metadata } from 'next';
import { VerifyContent } from './VerifyContent';

export const metadata: Metadata = {
  title: 'Get Verified — VansList',
  description: 'Submit your app or tool for automated verification against 18 quality markers. Get the verified badge on your VansList listing.',
};

export default function GetVerifiedPage() {
  return <VerifyContent />;
}
