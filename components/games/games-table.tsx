'use client'

import {
    Table, TableHeader, TableBody,
    TableRow, TableHead, TableCell
} from '@/components/ui/table'
import { AnalystStatus, Game } from '@/lib/types';
import { StatusBadge } from '@/components/games/status-badge';
import { useRouter } from 'next/navigation';

interface GameRowProps {
    id: string
    title: string
    developer: string | null
    short_description: string | null
    analyst_status: AnalystStatus
}

interface GameTableProps {
    games: Game[]
}

function GameRow({ id, title, developer, short_description, analyst_status }: GameRowProps) {
    const router = useRouter();
    return (
        <TableRow className="cursor-pointer" onClick={() => router.push(`/games/${id}`)}>
            <TableCell>{title}</TableCell>
            <TableCell>{developer ?? '-'}</TableCell>
            <TableCell>{short_description ?? '-'}</TableCell>
            <TableCell><StatusBadge analyst_status={analyst_status} /></TableCell>
        </TableRow>
    );
}

export default function GameTable({ games }: GameTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Developer</TableHead>
                    <TableHead>Short Description</TableHead>
                    <TableHead>Analyst Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {games?.map((game) => (
                    <GameRow {...game} key={game.id} />
                ))}
            </TableBody>
        </Table>
    )
}