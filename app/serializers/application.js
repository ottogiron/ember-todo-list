import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeFindAllResponse(store, primaryModelClass, payload) {
    return {
      data: payload.map((item) => {
        let newItem = this.normalize(primaryModelClass, item).data;
        return newItem;
      })
    };
  },
  extractId(modelClass, resourceHash) {
    return resourceHash.id;
  },
  extractAttributes (modelClass, resourceHash) {
    delete  resourceHash.id;
    delete resourceHash.type;
    return resourceHash;
  },
  serialize(snapshot){
    let serialized = snapshot.attributes();
    if(snapshot.id){
      serialized.id = snapshot.id;
    }
    return serialized;
  },
  normalizeCreateRecordResponse (store, primaryModelClass, payload){
    let newItem = this.normalize(primaryModelClass, payload).data;

    return { data: newItem };
  },
  normalizeUpdateRecordResponse (store, primaryModelClass, payload){
    let newItem = this.normalize(primaryModelClass, payload).data;

    return { data: newItem };
  }
});
