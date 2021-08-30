import dataJSON from '../../mock.json';
import tranformResponse, {
    createTimeRange,
    transformSingleJob,
} from './jobsTransforms';
import { JobsByLocationData, APIResponse } from './jobsInterface';

// Checking if a createTimeRange function works correctly
test('function -- createTimeRange', () => {
    const hour = 10;
    const duration = 3;

    expect(
        createTimeRange(new Date(`2020-05-05 ${hour}:30`), duration)
    ).toEqual(`${hour}:30 - ${hour + duration}:30`);
    expect(
        createTimeRange(new Date(`2020-05-05 ${hour}:00`), duration)
    ).toEqual(`${hour}:00 - ${hour + duration}:00`);
});

// Checking if a transformSingleJob function transforms a job correctly
test('function -- transformSingleJob', () => {
    const compareJob = JSON.parse(
        '{"uuid":"69625669-7033-4c55-956c-59ced45dbe59","agent":"Jessica Agent","locationUuid":"f97baa38-d427-43c2-b09e-f740230050ee","date":"MON, SEP 20","hours":"8:30 - 10:30","repetition":"Every two weeks","type":"Home cleaning","timestamp":1632119400000}'
    );
    const result = transformSingleJob({
        uuid: '69625669-7033-4c55-956c-59ced45dbe59',
        amount: 64,
        currency: 'CHF',
        executionDate: '2021-09-20 08:30',
        agent: 'Jessica Agent',
        contractPeriodicity: 14,
        floorAndDoor: '',
        locationComment: '',
        type: 'HOME_CLEANING',
        duration: 2,
        location: 'Foobar 9',
        locationUuid: 'f97baa38-d427-43c2-b09e-f740230050ee',
    });

    expect(result).toEqual(compareJob);
});

// Checking if a transformResponse function returns exactly the same number of jobs as a number of jobs in the database
test('function -- transformResponse', async () => {
    const response = <APIResponse>dataJSON['jobs-data'];
    const transformedRespons = tranformResponse(response);
    const counterFunc = function (data: JobsByLocationData[]) {
        let i = 0;

        data.forEach(record => (i += record.jobs?.length || 0));

        return i;
    };

    expect(
        counterFunc(transformedRespons.upcoming) +
            counterFunc(transformedRespons.previous)
    ).toEqual(response.jobs.length);
});
