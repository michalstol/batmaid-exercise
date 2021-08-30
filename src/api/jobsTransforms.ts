import {
    APIResponse,
    APISingleJob,
    SingleJobData,
    APISingleLocation,
    TypeOfJobs,
    RepetitionType,
    JobsSplitedByDate,
    JobsByLocationData,
} from './jobsInterface';

const currentDate = new Date().getTime();

function getRepetitionLabel(value: number): RepetitionType {
    switch (value) {
        case 7:
            return 'Weekly';
        case 14:
            return 'Every two weeks';
        case 28:
            return 'Monthly';
        default:
            throw new Error(
                `Incorrect value of a repetition type in a single job record : ${value}`
            );
    }
}

function createDateLabel(date: Date): string {
    const day = date
        .toLocaleString('en-US', { weekday: 'short' })
        .toUpperCase();
    const month = date
        .toLocaleString('en-US', { month: 'short' })
        .toUpperCase();

    return `${day}, ${month} ${date.getDate()}`;
}

export function createTimeRange(date: Date, duration: number): string {
    const dateHours = date.getHours();
    const dateMinutes = date.getMinutes() || '00';

    return `${dateHours}:${dateMinutes} - ${
        dateHours + duration
    }:${dateMinutes}`;
}

export function transformSingleJob({
    uuid,
    type,
    agent,
    executionDate,
    duration,
    contractPeriodicity,
    locationUuid,
}: APISingleJob): SingleJobData {
    const date = new Date(executionDate);

    return {
        uuid,
        agent,
        locationUuid,
        date: createDateLabel(date),
        hours: createTimeRange(date, duration),
        repetition: getRepetitionLabel(contractPeriodicity),
        type: TypeOfJobs[type],
        timestamp: date.getTime(),
    };
}

function sortSingleJobs(a: SingleJobData, b: SingleJobData): number {
    return a.timestamp < b.timestamp ? -1 : 1;
}

function transformJobs(jobs: APISingleJob[]): SingleJobData[] {
    return jobs.map(transformSingleJob).sort(sortSingleJobs);
}

function filterJobsByDate(compareFunct: (x: number, y: number) => boolean) {
    return ({ timestamp }: SingleJobData) =>
        compareFunct(timestamp, currentDate);
}

function filterJobsByLocation(uuid: string) {
    return ({ locationUuid }: SingleJobData) => locationUuid === uuid;
}

function transformSingleLocation({
    location,
    uuid,
}: APISingleLocation): JobsByLocationData {
    return {
        uuid,
        location,
        jobs: null,
    };
}

function sortLocations(
    { location: aName }: APISingleLocation,
    { location: bName }: APISingleLocation
): number {
    return aName.toLowerCase().localeCompare(bName.toLowerCase());
}

function transformLocations(
    locations: APISingleLocation[],
    jobs: SingleJobData[]
): JobsSplitedByDate {
    const sortedLocations = [...locations].sort(sortLocations);
    const results: JobsSplitedByDate = {
        upcoming: [],
        previous: [],
    };

    sortedLocations.forEach(location => {
        const filteredJobs = jobs.filter(filterJobsByLocation(location.uuid));
        const upcomingJobs = filteredJobs.filter(
            filterJobsByDate((x, y) => x > y)
        );
        const previousJobs = filteredJobs.filter(
            filterJobsByDate((x, y) => x < y)
        );

        if (upcomingJobs.length) {
            results.upcoming.push({
                ...transformSingleLocation(location),
                jobs: [...upcomingJobs],
            });
        }

        if (previousJobs.length) {
            results.previous.push({
                ...transformSingleLocation(location),
                jobs: [...previousJobs],
            });
        }
    });

    return results;
}

export default function tranformResponse(data: APIResponse): JobsSplitedByDate {
    const transformedJobs = transformJobs(data.jobs);
    const results = transformLocations(data.jobsByLocation, transformedJobs);

    return results;
}
