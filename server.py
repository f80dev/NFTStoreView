import ssl
import sys

from flask import Flask, jsonify, request

import logging

from flask_cors import CORS

logging.getLogger('werkzeug').setLevel(logging.ERROR)
logging.getLogger('apscheduler.scheduler').setLevel(logging.ERROR)
logging.getLogger('engineio.server').setLevel(logging.ERROR)
logging.getLogger('urllib3.connectionpool').setLevel(logging.ERROR)
logging.getLogger('flask_caching.backends.simplecache').setLevel(logging.ERROR)
logging.getLogger('environments').setLevel(logging.ERROR)


from NftStore import NftStore

app = Flask(__name__)
CORS(app)

#http://127.0.0.1:2222/api/nfts/?collections=Desert%20Reflections
@app.route('/api/nfts/')
def nfts():
  nft_store=NftStore()
  collections=request.args.get("collections","")
  rc=nft_store.nfts(collections,limit=int(request.args.get("limit","100")))
  return jsonify(rc)

#http://127.0.0.1:2222/api/collections/?filter=coachella
@app.route('/api/collections/')
def collections():
  nft_store=NftStore()
  rc=nft_store.collections(request.args.get("filter",""))
  return jsonify(rc)

if __name__ == '__main__':
  if "ssl" in sys.argv:
    context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
    context.load_cert_chain("/certs/fullchain.pem", "/certs/privkey.pem")
    app.run(port=2222,ssl_context=context)
  else:
    app.run(port=2222)
