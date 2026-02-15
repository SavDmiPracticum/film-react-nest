export interface FilmsRepository {
  getFilms(): Promise<any>;
  getFilmById(id: string): Promise<any>;
  updateFilmTaken(
    filmId: string,
    scheduleId: string,
    seats: string[],
  ): Promise<any>;
}
