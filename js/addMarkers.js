AFRAME.registerComponent("create-markers",{
  init:async function(){
    var mainScene= document.querySelector("#main-scene")
    var dishes=await this.getDishes()
    dishes.map(dish=>{
      var marker=document.createElement("a-marker")
      marker.setAttribute("id",dish.id)
      marker.setAttribute("type","pattern")
      marker.setAttribute("url",dish.marker_pattern_url)
      marker.setAttribute("cursor",{
        rayOrigin:"mouse"
      })
      marker.setAttribute("markerhandler",{})
      mainScene.appendChild(marker)
    })

    var model=document.createElement("a-entity")
    model.setAttribute("id",`model-${dish.id}`) // model-D01
    model.setAttribute("position",dish.model_geometry.position)
    model.setAttribute("rotation",dish.model_geometry.rotation)
    model.setAttribute("scale",dish.model_geometry.scale)
    model.setAttribute("gltf-model",`url(${dish.model_url})`)
    model.setAttribute("gesture-handler",{})
    marker.appendChild(model)
  },

  getDishes:async function(){
    return await firebase
    .firestore()
    .collection("dishes")
    .get()
    .then(snap=>{
      return snap.docs.map(doc=>doc.data())
    })
  }
})