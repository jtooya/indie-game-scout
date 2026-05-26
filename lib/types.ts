export type AnalystStatus = 'watching' | 'interesting' | 'high_priority' | 'contact_candidate' | 'rejected' | 'archived';

export interface Game {
    id: string
    steam_appid: number
    title: string
    developer: string | null
    publisher: string | null
    release_date: string | null
    store_url: string | null
    capsule_image_url: string | null
    header_image_url: string | null
    short_description: string | null
    genres: string[] | null
    tags: string[] | null
    platforms: string[] | null
    price_cents: number | null
    currency: string
    is_free: boolean
    analyst_status: AnalystStatus
    priority: number
    first_seen_at: string
    last_checked_at: string | null
    created_at: string
    updated_at: string
    is_released: boolean
}

export interface GameSnapshot {
    id: string
    game_id: string
    snapshot_date: string
    total_review_count: number | null
    positive_review_count: number | null
    negative_review_count: number | null
    recent_positive_ratio: number | null
    recent_review_count: number | null
    recent_positive_count: number | null
    recent_negative_count: number | null
    positive_ratio: number | null
    fetched_at: string
}

export interface GameScore {
    id: string
    game_id: string
    score_date: string
    quality_score: number | null
    momentum_score: number | null
    hidden_gem_score: number | null
    scout_score: number | null
    risk_score: number | null
    explanation: Record<string, string> | null
    created_at: string
}

export interface GameNote {
    id: string
    game_id: string
    note: string
    note_type: 'general' | 'red_flag' | 'opportunity' | 'contact'
    created_at: string
    updated_at: string
}

export interface GameWithMetrics extends Game {
    latest_snapshot: GameSnapshot | null
    latest_score: GameScore | null
}
