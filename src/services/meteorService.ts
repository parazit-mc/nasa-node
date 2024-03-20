import axios  from 'axios';
import qs  from 'qs';
import { DateTimeFormatOptions } from 'intl';
import { Meteor } from "../models/meteorModel";

interface MeteorNearby {
    [key: string]: Meteor[];
}

export async function getMeteors(date: string | null, isHazardous: boolean, count: number | null): Promise<Meteor[] | undefined> {
    const uri = buildMeteorUri();
    const response = await axios.get(uri);
    const meteorsNearby = response.data.near_earth_objects;
    return getMeteorsInfo(meteorsNearby, date, isHazardous, count);
}

function getMeteorsInfo(
    meteorsNearby: MeteorNearby,
    queryDate: string | null,
    isHazardous: boolean,
    count:number | null
): Meteor[] {
    let result: Meteor[] = [];
    const meteors = Object.values(meteorsNearby).flatMap((date: Meteor[]) =>
        date.map((m: Meteor) => ({
            id: m.id,
            name: m.name,
            estimated_diameter: m.estimated_diameter,
            is_hazardous: m.is_hazardous,
            close_approach_data: m.close_approach_data
        })));

    if (queryDate) {
        result = meteors.filter(meteor =>
            meteor.close_approach_data[0].close_approach_date.split(' ')[0] === queryDate
        );
    } else {
        result = meteors;
    }

    if (isHazardous){
        result = result.filter(meteor => meteor.is_hazardous);
    }

    if (count){
        result = result.slice(0, count);
    }

    return result;
}

function buildMeteorUri(){
    const BASE_METEOR_URL = process.env.BASE_METEOR_URL;
    const formatOptions: DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const today = new Date();
    const currentDay = today.getDay();

    let monday, friday;

    if (currentDay === 0 || currentDay === 6){
        monday = new Date(today);
        monday.setDate(today.getDate() - (currentDay - 1));
        friday = new Date(today);
        friday.setDate(today.getDate() + (5 - currentDay));
    } else {
        monday = new Date(today);
        monday.setDate(today.getDate() - (currentDay + 6));
        friday = new Date(today);
        friday.setDate(today.getDate() - (currentDay + 2));
    }
    const mondayDate = monday.toLocaleDateString('en-US', formatOptions);
    const fridayDate = friday.toLocaleDateString('en-US', formatOptions);
    console.log('Start date is ' + mondayDate);
    console.log('End date is ' + fridayDate);

    const queryParams = {
        START_DATE: mondayDate,
        END_DATE: fridayDate,
        API_KEY: process.env.API_KEY
    };
    return `${BASE_METEOR_URL}?${qs.stringify(queryParams)}`;
}

export default { getMeteors }