import { TVShow } from "./tv-show.model";

export interface SearchResponse {
    page: number;
    results: TVShow[];
    total_pages: number;
    total_results: number;
}