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
access_key = '7ff98d7c74fc0f48dec19648b2dcc93f77de38bbde6687d86547d5c36b942e9a' #All perms
# access_key = '66d039f3cc486037cc1cbe023484193b40859dad68aafadf34728190e6344843' #Read-Only
# Use the Ed25519 signing private key

signing_key_str = 'eaf5a7d73d82927c46e415f8801e4c4a1add3fb80fa5dd30f4225f30c9d8b783' # load the raw string

signing_key = bytes(bytearray.fromhex(signing_key_str))

data = {}

anchorage_auth = AnchorageAuth(access_key, signing_key)
#
# r = requests.post("https://api.anchorage-staging.com/v2/transfers", json={
#     "sendingVaultId": "4bcaf2407dafe7b1fb43ec2399ab8e9a", #from Maker Vault
#     "assetType": "ETHT",
#     "destinationVaultId": "e17909b43b085e8626acb6088f087b05", #to Brian Test Vault
#     "amount": "0.001",
#     # "transferMemo": "Colin's test transfer via API #4"
# }, auth=anchorage_auth)
request = requests.post("https://api.anchorage-staging.com/v2/trading/quote", json={
"currency": "USD",
"quantity": "98",
"side": "BUY",
"tradingPair": "BTC-USD"
}, auth=anchorage_auth)
quoteId = request.json()['data']['quoteID']
accept = requests.post("https://api.anchorage-staging.com/v2/trading/quote/accept", json={
    "quoteID": quoteId,
    "side": "BUY"
}, auth=anchorage_auth)
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

print(accept)

# in python3...
# exec(open("generate-signature.py").read())
# *._content
