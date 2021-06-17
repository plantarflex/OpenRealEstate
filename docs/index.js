const { kakao } = window
var map
console.log(kakao)

const renderBjdData = (map) => {
  const customOverlay = new kakao.maps.CustomOverlay({})
  bjdData.features.forEach((data) => {
    const coords = [].concat(...data.geometry.coordinates)
    const path = coords.map(
      (ll) => new kakao.maps.LatLng(Number(ll[1]), Number(ll[0])),
    )
    const polygon = new kakao.maps.Polygon({
      map: map,
      path: path,
      strokeWeight: 1,
      strokeColor: "red",
      strokeOpacity: 0.8,
      fillColor: "transparent",
      fillOpacity: 0.7,
    })
    kakao.maps.event.addListener(polygon, "mouseover", function (mouseEvent) {
      customOverlay.setContent(
        '<div class="area"><b style="color:black;">' +
          data.properties.EMD_NM +
          "(" +
          data.properties.EMD_CD +
          ")" +
          "</b></div>",
      )
      customOverlay.setPosition(mouseEvent.latLng)
      customOverlay.setMap(map)
    })
    kakao.maps.event.addListener(polygon, "mousemove", function (mouseEvent) {
      customOverlay.setPosition(mouseEvent.latLng)
    })
  })
}

const renderRoneData = () => {
  roneData.forEach((d) => {
    const path = d.latlng.map(
      (ll) => new kakao.maps.LatLng(Number(ll[0]), Number(ll[1])),
    )
    const polygon = new kakao.maps.Polygon({
      map: map,
      path: path,
      strokeWeight: 2,
      strokeColor: "#004c80",
      strokeOpacity: 0.8,
      fillColor: "#09f",
      fillOpacity: 0.7,
    })
    const [x0, y0] = d.latlng[0].map((ll) => Number(ll))
    const [x1, y1] = d.latlng[1].map((ll) => Number(ll))
    const infowindow = new kakao.maps.InfoWindow({
      position: new kakao.maps.LatLng((x0 + x1) / 2, (y0 + y1) / 2),
      content: '<b style="color:blue;">' + d.name + "</b>",
    })
    infowindow.open(map)
    kakao.maps.event.addListener(polygon, "click", function (mouseEvent) {
      console.log(d.name)
    })
  })
}

const panMap = ({ y, x }) => {
  const nextPos = new kakao.maps.LatLng(y, x)
  map.panTo(nextPos)
}

function init() {
  const defaultPosition = {
    y: 37.57319,
    x: 126.96658,
  }
  map = new kakao.maps.Map(document.getElementById("mainMap"), {
    center: new kakao.maps.LatLng(defaultPosition.y, defaultPosition.x),
    level: 3,
  })
  map.addOverlayMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT)
  panMap(defaultPosition)
  renderRoneData(map)
  renderBjdData(map)
}

init()
