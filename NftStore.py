#Documentation FTX
#list des NFTs: https://docs.ftx.com/?javascript#list-nfts

from time import time
import hmac
from urllib.request import Request

import requests

class NftStore:



  def __init__(self,domain="ftx.us"):
    #self.authent("d87Qu7i0znABaUs0mbMLM_LS2gPntUFEhnO9HbE8","u4jGfTNN17xFb5fA2XFwE5rNWkEV0w2f9sBj2Jxd")
    self.domain="https://"+domain

  # def authent(self,api_key,api_secret):
  #   ts = int(time() * 1000)
  #   request = Request('GET', '<api_endpoint>')
  #   prepared = request.prepare()
  #   signature_payload = f'{ts}{prepared.method}{prepared.path_url}'.encode()
  #   signature = hmac.new(self.api_secret.encode(), signature_payload, 'sha256').hexdigest()
  #
  #   prepared.headers['FTX-KEY'] = api_key
  #   prepared.headers['FTX-SIGN'] = signature
  #   prepared.headers['FTX-TS'] = str(ts)



  def nfts(self,collections,limit=100):
    """
    Récupération des NFTs d'une ou plusieurs collections
    :param collections: liste des collections séparées par une ,
    :param limit:
    :return:

    """
    rc=list()
    if len(collections)==0:
      return requests.get(self.domain+"/api/nft/nfts").json()

    for collection in collections.split(","):
      req = requests.get(self.domain+"/api/nft/nfts?collection="+collection)
      rc=rc+req.json()["result"]

    return {"success":True,"result":rc}


  #
  def collections(self,filter:str=""):
    request = requests.get(self.domain+"/api/nft/collections")
    rc=list()
    for col in request.json()["result"]:
      if len(filter)==0 or filter.lower() in col["collection"].lower():
        rc.append(col)

    return rc
