
// interfaces for react components
interface ScreenshotWithCaptionI {
    screenshotsWithCaptions: IndividualFilmDataI
}

// interfaces for data
interface FilmResultsDataWrapperI {
    results: FilmResultsDataI
}

export interface FilmResultsDataI extends Array<IndividualFilmDataI>{}

export interface IndividualFilmDataI {
    movieReleaseYear: number,
    dvdReleaseYear: number,
    movieTitle: string,
    movieOclcId: number,
    results: ScreenshotWithCaptionDataListI
}

interface ScreenshotWithCaptionDataListI extends Array<ScreenshotWithCaptionDataI>{}

interface ScreenshotWithCaptionDataI {
    movieLineText: string,
    movieStartTimeStamp: string,
    movieEndTimeStamp: string,
    movieLineNumber: number
}
