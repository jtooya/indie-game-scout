import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Game } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import {AnalystStatus} from "@/lib/types";


export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const game = await FetchGame(id);
    return (
        <div className="grid grid-cols-3 gap-4 p-5">
            <div>
                <TitleCard {...game}/>
            </div>
            <div>
                <p>Game ID: {id}</p>
            </div>
        </div>
    )
}

async function FetchGame(id: string) {
    const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error || !data) {
        notFound();
    }

    return data as Game;
}

interface TitleProps {
    title: string
    developer: string | null
    publisher: string | null
}

interface subtitleProps {
    release_date: string | null
    platforms: string[] | null
    price: number | null
}

interface descriptionProps {
    short_description: string | null
    long_description: string | null
}

interface genreProps {
    genres: string[] | null
    tags: string[] | null
}

interface analystProps {
    analyst_status: AnalystStatus
}

function TitleCard({ title, developer, publisher }: TitleProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Developer: {developer ?? '-'}</p>
                <p>Publisher: {publisher ?? '-'}</p>
            </CardContent>
        </Card>
    )
}
