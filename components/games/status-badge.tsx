import { Badge } from '@/components/ui/badge';
import { AnalystStatus } from '@/lib/types';


const STATUS_CONFIG: Record<AnalystStatus, { label: string, variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link' }> = {
    watching: { label: 'Watching', variant: 'secondary' },
    interesting: { label: 'Interesting', variant: 'default' },
    high_priority: { label: 'High Priority', variant: 'destructive' },
    rejected: { label: 'Rejected', variant: 'outline' },
    contact_candidate: { label: 'Contact Candidate', variant: 'default' },
    archived: { label: 'Archived', variant: 'link' },
};

export function StatusBadge({ analyst_status }: { analyst_status: AnalystStatus }) {
    const config = STATUS_CONFIG[analyst_status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
}