import { supabase } from '@/lib/supabase';
import { Game } from '@/lib/types';
import GameTable from '@/components/games/games-table';

async function getGames(): Promise<Game[]> {
    const { data, error } = await supabase.from('games').select('*');
    if (error) throw new Error(error.message);
    return data ?? [];
}

export default async function GamesPage() {
    const games = await getGames();

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Tracked Games</h1>
            <div className="rounded-md border">
                <GameTable games={games} />
            </div>
        </div>

    );
}
