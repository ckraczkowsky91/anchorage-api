from nacl import signing

import time

import requests


class AnchorageAuth(requests.auth.AuthBase):
    ACCESS_KEY_HEADER = "Api-Access-Key"
    SIGNATURE_HEADER = "Api-Signature"
    TIMESTAMP_HEADER = "Api-Timestamp"
    access_key: str
    signing_key: signing.SigningKey
    def __init__(self, access_key: str, signing_key_seed: bytes):
        self.access_key = access_key
        self.signing_key = signing.SigningKey(signing_key_seed)
    def __call__(self, r: requests.PreparedRequest):
        r.headers[self.ACCESS_KEY_HEADER] = self.access_key
        timestamp = str(int(time.time()))
        method = r.method.upper() if r.method else "GET"
        body: bytes = bytes()
        if r.body and isinstance(r.body, bytes):
            body = r.body
        elif r.body and isinstance(r.body, str):
            body = bytearray(r.body, "utf-8")
        message = b"".join(
            [bytearray(timestamp, "utf-8"), bytearray(method, "utf-8"), bytearray(r.path_url, "utf-8"), body]
        )
        signature = self.signing_key.sign(message).signature.hex()
        r.headers[self.SIGNATURE_HEADER] = signature
        r.headers[self.TIMESTAMP_HEADER] = timestamp
        return r
    def __repr__(self):
         return "<Response a:%s b:%s>" % (self.a, self.b)


# load secrets

# Use the API key generated in the Anchorage Web Dashboard
access_key = ''

# Use the Ed25519 signing private key
signing_key_str = ''


signing_key = bytes(bytearray.fromhex(signing_key_str))

data = {}

anchorage_auth = AnchorageAuth(access_key, signing_key)
# VIEW ASSET TYPES
# r = requests.get("https://api.anchorage-staging.com/v2/asset-types", auth=anchorage_auth)
# CREATE A TRANSFER
# r = requests.post("https://api.anchorage-staging.com/v2/transfers", json={
#     # "sendingVaultId": "b1a169a9c8ce886a491d0227cb4dd6c0", #from Group Vault
#     "assetType": "ZEC_T",
#     # "destinationVaultId": "6e9079c8348d6d9da993b639151cfc82", #to Test Vault 88
#     "amount": "7",
#     "transferMemo": "Vault-to-vault transfer testing",
#     "source": {
#         "id":"b1a169a9c8ce886a491d0227cb4dd6c0",
#         "type":"VAULT"
#     },
#     "destination": {
#         "id": "15d3c458e994b814e3b3644e91f6448b",
#         "type": "VAULT"
#     },
#     "idempotentId": "123460"
# }, auth=anchorage_auth)
# CREATE A WITHDRAWAL
# r = requests.post("https://api.anchorage-staging.com/v2/transactions/withdrawal", json={
# "sendingVaultId": "15d3c458e994b814e3b3644e91f6448b", #Group Vault
# "assetType": "XTZ",
# "destinationAddress": "tz1cL3cqxanqtJDPLN4obGLT2NmAQ3ppMvrJ",
# "amount": "0.000001",
# "amlResponses": {
# "destinationType": "EXCHANGE",
# "institutionName": "string",
# "withdrawalPurpose": "TRADING"
# }
# }, auth=anchorage_auth)
# CREATE A HOLD
# r = requests.post("https://api.anchorage-development.com/v2/holds", json={
#     "amount": "5",
#     "assetType": "BCH_R",
#     # "expiresIn": 604800,
#     # "idempotentId": "6784567",
#     "memo": "Internal trade ID 0xabc123",
#     "vaultId": "61d88533c9d8e58ec7ba86b2af38970d"
# }, auth=anchorage_auth)
# DELETE A HOLD
# hold_id = "f9b2935ef27f883e6a8e5a95882a02dedd91675a6325e96550c5c4c35658442b"
# r = requests.delete("https://api.anchorage-staging.com/v2/holds/" + hold_id, auth=anchorage_auth)
# EXECUTE A HOLD
# r = requests.post("https://api.anchorage-staging.com/v2/holds/f253ee07520672d5bc2e394747040e2941449617157bed5d8e6eaacce7dae6cf/execute", json={
#     "amount": "0.006",
#     "destinationVaultId": "df3d7b64a434db91ceed8fb9e254cd9c",
#     "releaseHold": False,
#     "transferMemo": "Partial execution"
# }, auth=anchorage_auth)
# GET A QUOTE
# r = requests.post("https://api.anchorage-staging.com/v2/trading/quote", json={
# "currency": "USD",
# "quantity": "98",
# "side": "BUY",
# "tradingPair": "BTC-USD"
# }, auth=anchorage_auth)
# ACCEPT A QUOTE
# r = requests.post("https://api.anchorage-staging.com/v2/trading/quote/accept", json={
#     "quoteID": "f902afec-a44d-49df-8862-00cbeeb99b43",
#     "side": "BUY"
# }, auth=anchorage_auth)
# r = requests.post("https://api.anchorage-development.com/v2/transactions/withdrawal", json={
#     "sendingVaultId": "f540b977c949d1db8baa16f4653a789e",
#     "assetType": "ETH_R",
#     "destinationAddress": "0x0375d33d431D3468D8dbB196aa6E5EA0Af540894",
#     "amount": "3",
#     "amlResponses": {
#         "destinationType": "EXCHANGE",
#         "destinationTypeOther": "string",
#         "institutionName": "string",
#         "withdrawalPurpose": "TRADING",
#         "withdrawalPurposeOther": "string"
# }}, auth=anchorage_auth)
# r = requests.get("https://api.anchorage-development.com/v2/vaults", auth=anchorage_auth)
# CREATE AN ORDER
# r = requests.post("https://api.anchorage-staging.com/v2/orders", json={
#     "quantity" : "10",
#     "assetType": "USDC_T",
#     "source": {
#         "id": "25d6cbaa673ce268d0dfbb6bcdc7e510",
#         "type": "VAULT"
#     },
#     # "idempotentId": "567890",
#     "expiresIn": 604800,
#     "memo": "ATS order reference",
#     "counterAssetType" : "BTC",
#     "side" : "BUY",
#     "type" : "MKT",
#     "tif" : "GTC",
#     "price": "1.23",
#     "exposure": "4.38",
#     "time" : "1623422417863.680000"
# }, auth=anchorage_auth)
# EXECUTE AN ORDER
r = requests.post("https://api.anchorage-staging.com/v2/orders/1c0eff112147416cf5fd59101913915099b9ff3684fa949f7b0ba9d05f077b80/execute", json={
    "quantity" : "0.5",
    "destination": {
        "id": "15d3c458e994b814e3b3644e91f6448b",
        "type": "VAULT"
    },
    "releaseOrder": True,
    # "idempotentId": "234596",
    "memo": "ATS order reference"
}, auth=anchorage_auth)

print(r)

# in python3...
# exec(open("generate-signature.py").read())
# *._content
