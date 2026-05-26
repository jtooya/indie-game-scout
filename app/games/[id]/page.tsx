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
import { Badge } from '@/components/ui/badge';
import { notFound } from "next/navigation";
import { AnalystStatus } from "@/lib/types";
import { StatusBadge } from "@/components/games/status-badge";
import Link from "next/link"


export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const game = await FetchGame(id);
    return (
        <div className="container mx-auto p-8">
            <img src={game.header_image_url ?? undefined} className="block mx-auto"></img>
            <div>
                <Button asChild size="lg">
                    <Link href={"/games"}>Back</Link>
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 p-5">
                <div>
                    <TitleCard {...game}/>
                </div>
                <div>
                    <SubtitleCard {...game}/>
                </div>
                <div>
                    <DescriptionCard {...game}/>
                </div>
                <div>
                    <GenreCard {...game}/>
                </div>
                <div>
                    <AnalystCard {...game}/>
                </div>
                <div>
                    <p>Game ID: {id}</p>
                </div>
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

interface SubtitleProps {
    release_date: string | null
    platforms: string[] | null
    price_cents: number | null
    currency: string
}

interface DescriptionProps {
    short_description: string | null
}

interface GenreProps {
    genres: string[] | null
    tags: string[] | null
}

interface AnalystProps {
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

function SubtitleCard({ release_date, platforms, price_cents, currency }: SubtitleProps) {
    const priceDollars = (price_cents ?? 0) / 100;
    let release_local = "-";
    if (release_date !== null) {
        release_local = (new Date(release_date)).toLocaleDateString();
    }

    return (
        <Card>
            <CardContent>
                <p>Release date: {release_local}</p>
                <p>Platforms: {platforms?.join(", ")}</p>
                <p>Price: {priceDollars} {currency} </p>
            </CardContent>
        </Card>
    )
}

function DescriptionCard({ short_description }: DescriptionProps) {
    return (
        <Card>
            <CardContent>
                <p>{ short_description }</p>
            </CardContent>
        </Card>
    )
}

function GenreCard({ genres, tags }: GenreProps) {
    return (
        <Card>
            <CardContent>
                <p>Genres: {genres?.map(genre =>
                    <Badge className="m-1" variant="default" key={genre}>{genre}</Badge>
                )}</p>
                <p>Tags: {tags?.map(tag =>
                    <Badge className="m-1" variant="default" key={tag}>{tag}</Badge>
                )}</p>
            </CardContent>
        </Card>
    )
}

function AnalystCard({ analyst_status }: { analyst_status: AnalystStatus }) {
    return (
        <Card>
            <CardContent>
                <p><StatusBadge analyst_status={analyst_status}  /></p>
            </CardContent>
        </Card>
    )
}


