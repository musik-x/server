var listArtist = ['0Vw76uk7P8yVtTClWyOhac', '7dGJo4pcD2V6oG8kP0tJRR', '41MozSoPIsD1dJM0CLPjZF', '6eUKZXaKkcviH0Ku9w2n3V', '5JZ7CnR6gTvEMKX4g70Amv', '0hCNtLu0JehylgoiP8L4Gh', '6M2wZ9GZgrQXHCFfjv46we', '5WUlDfRSoLAfcVSX1WnrxN', '1zNqDE7qDGCsyzJwohVaoX', '6qqNVTkY8uBg9cP3Jd7DAH']
listArtist.sort(function () {
  return 0.5 - (Math.floor(Math.random() * (new Date().getTime() + '')[0]) + (Math.random()).toString()[0])
})
if (listArtist.length > 8) {
  listArtist.length = 8
}

module.exports = listArtist