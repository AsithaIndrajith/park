export function generateResult(data) {
  let result = [];

  let time = new Date(data.time);
  time = time.toString().split(' ');
  // time = time.splice(0, time.length - 1);
  time = time.toString().replace(/,/g, ' ');
  result.push(['clock', time.toString()]);
  result.push(['map-marker', data.location.toString()]);
  if (data.isAlive === 1) {
    result.push(['cards-heart', 'Alive']);
  } else {
    result.push(['cards-heart', 'Dead']);
  }
  // if (data.type !== '') {
  //   result.push(['elephant', data.type]);
  // } else {
  //   result.push(['elephant', 'Un-Identified']);
  // }
  result.push(['shield-check', data.verified]);
  if (data.notes !== '') {
    result.push(['note-text', data.notes]);
  } else {
    result.push(['note-text', 'Notes unavailable']);
  }
  return result;
}

export function generateUUID() {
  let dt = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    c,
  ) {
    let r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  //console.log(uuid)
  return uuid;
}
