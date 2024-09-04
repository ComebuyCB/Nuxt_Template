export const use_FetchProxy = (url, options={}, eventHandler={}) => {
  // console.log( url, options, eventHandler )
  return useFetch('/api/proxy' + url, {
    method: 'POST',
    body: options,
    onRequest(context) {
      if (eventHandler?.onRequest) {
        eventHandler.onRequest(context);
      }
    },
    onResponse(context) {
      if (eventHandler?.onResponse) {
        eventHandler.onResponse(context);
      }
    },
    onRequestError(context) {
      console.error('onRequestError:', context)
      if (eventHandler?.onRequestError) {
        eventHandler.onRequestError(context);
      }
    },
    onResponseError(context) {
      console.error('onResponseError:', context.response)
      alert( context.response._data.message )
      if (eventHandler?.onResponseError) {
        eventHandler.onResponseError(context);
      }
    },
  })
}

export const use_$fetchProxy = (url, options={}, eventHandler={}) => {
  // console.log( url, options, eventHandler )
  return $fetch('/api/proxy' + url, {
    method: 'POST',
    body: options,
    onRequest(context) {
      if (eventHandler?.onRequest) {
        eventHandler.onRequest(context);
      }
    },
    onResponse(context) {
      if (eventHandler?.onResponse) {
        eventHandler.onResponse(context);
      }
    },
    onRequestError(context) {
      console.error('onRequestError:', context)
      if (eventHandler?.onRequestError) {
        eventHandler.onRequestError(context);
      }
    },
    onResponseError(context) {
      console.error('onResponseError:', context.response)
      alert( context.response._data.message )
      if (eventHandler?.onResponseError) {
        eventHandler.onResponseError(context);
      }
    },
  })
}


