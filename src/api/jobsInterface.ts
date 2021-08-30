export interface APISingleLocation {
    location: string;
    total: number;
    jobs: string[];
    uuid: string;
    state: string;
    city: string;
}

export interface APISingleJob {
    uuid: string;
    amount: number;
    currency: string;
    executionDate: string;
    agent: string;
    contractPeriodicity: number;
    floorAndDoor: string;
    locationComment: string;
    type: 'HOME_CLEANING' | 'END_OF_TENANCY';
    duration: number;
    location: string;
    locationUuid: string;
}

export interface APIResponse {
    jobs: APISingleJob[];
    jobsByLocation: APISingleLocation[];
}

export enum TypeOfJobs {
    HOME_CLEANING = 'Home cleaning',
    END_OF_TENANCY = 'End of Tenancy',
}

export type RepetitionType = 'Weekly' | 'Every two weeks' | 'Monthly';

export interface SingleJobData {
    uuid: string;
    date: string;
    hours: string;
    type: TypeOfJobs;
    repetition: RepetitionType;
    agent: string;
    timestamp: number;
    locationUuid: string;
}

export interface JobsByLocationData {
    uuid: string;
    location: string;
    jobs: SingleJobData[] | null;
}

export interface JobsSplitedByDate {
    upcoming: JobsByLocationData[];
    previous: JobsByLocationData[];
}
