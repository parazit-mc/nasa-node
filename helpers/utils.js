function getMeteorsInfo(meteorsNearby, queryDate, isHazardous, count){

    let meteors =  Object.values(meteorsNearby).flatMap(date=> 
        date.map(m=>({
        id: m.id,
        name: m.name,
        diameterMeters: m.estimated_diameter.meters.estimated_diameter_max,
        isHazardous: m.is_potentially_hazardous_asteroid,
        approachDate: m.close_approach_data[0].close_approach_date,
        velocityKps: m.close_approach_data[0].relative_velocity.kilometers_per_second
})))

if (queryDate) {
    result = meteors.filter(meteor =>
        meteor.approachDate.split(' ')[0] === queryDate
    );
} else {
    result = meteors;
}

if (isHazardous){
    result = result.filter(meteor => meteor.isHazardous === true)
}

if (count){
    result = result.slice(0, count);
}

    return result;
}

module.exports = getMeteorsInfo;

