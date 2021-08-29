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

function createTimeRange(date: Date, duration: number): string {
    const dateHours = date.getHours();
    const dateMinutes = date.getMinutes() || '00';

    return `${dateHours}:${dateMinutes} - ${
        dateHours + duration
    }:${dateMinutes}`;
}

function transformSingleJob({
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

function filterJobsByDate(jobs: SingleJobData[]): JobsSplitedByDate {
    return {
        upcoming: jobs.filter(({ timestamp }) => timestamp > currentDate),
        previous: jobs.filter(({ timestamp }) => timestamp < currentDate),
    };
}

function filterJobsByLocation(
    jobs: SingleJobData[],
    uuid: string
): SingleJobData[] {
    return jobs.filter(({ locationUuid }) => locationUuid === uuid);
}

function transformSingleLocation(
    { location, uuid }: APISingleLocation,
    jobs: SingleJobData[]
): JobsByLocationData {
    const { upcoming, previous } = filterJobsByDate(jobs);

    return {
        uuid,
        location,
        upcoming,
        previous,
    };
}

function sortLocations(
    { location: aName }: JobsByLocationData,
    { location: bName }: JobsByLocationData
): number {
    return aName.toLowerCase().localeCompare(bName.toLowerCase());
}

function transformLocations(
    locations: APISingleLocation[],
    jobs: SingleJobData[]
): JobsByLocationData[] {
    const results: JobsByLocationData[] = [];

    locations.forEach(location =>
        results.push(
            transformSingleLocation(
                location,
                filterJobsByLocation(jobs, location.uuid)
            )
        )
    );

    return results.sort(sortLocations);
}

export default function tranformResponse(
    data: APIResponse
): JobsByLocationData[] {
    const transformedJobs = transformJobs(data.jobs);
    const results = transformLocations(data.jobsByLocation, transformedJobs);

    return results;
}
