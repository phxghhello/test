加密: RSA加密和解密, 需要引入jsencrypt

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/2.3.1/jsencrypt.min.js"></script>
  <script>
    // import JsEncrypt from 'jsencrypt'
    let pubKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCOHVo1PgFd/kcorcqH/MfKWZUrfW42hC8Zpp1X
A0imM4AhMeEcuxGkrUFYxuMYKva0x6Vt2qao+ItZLTFGK5ScOKPAI8jbDniW59kc+WknuhwOhRI+
EPvFpWgNkx5K6ReQETnn1rUmRVtwaLqRtkRqpnwsidfFYyBqxfmp+kvKuQIDAQAB`;
    //实例化jsEncrypt对象
    let jse = new JSEncrypt();
    //设置公钥
    jse.setPublicKey(pubKey);
    let result = jse.encrypt("张三")
    console.log('加密：', result)

    let privateKey = `MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAI4dWjU+AV3+Ryityof8x8pZlSt9
          bjaELxmmnVcDSKYzgCEx4Ry7EaStQVjG4xgq9rTHpW3apqj4i1ktMUYrlJw4o8AjyNsOeJbn2Rz5
          aSe6HA6FEj4Q+8WlaA2THkrpF5AROefWtSZFW3BoupG2RGqmfCyJ18VjIGrF+an6S8q5AgMBAAEC
          gYAKZ3+5MibreLhA9ChFuG3wFIrlOjOdbiP8nsQaILVq5Y5V3875SYDLK5wDIdxyYoLZTVyBJGbb
          LAcXqkVXO82PXmxcpRDglABszE/3UG+9reX5XROy+VOqYBgFq4LUIQMZV7Seo4cG6ofj53Ns97hi
          aA4neSmijaA520oYIbZEuQJBAMVM1bdqA/suf+H8SelbYwGg4Re00HNkd1NAhr9j2xK1SODHxkBI
          clCToGyGJ3ryJjSuiXqGcfWlsA6lvO4VpYMCQQC4ZV8W0EsGAPM8Ppd/FXIJ65VqG18MUrTiFiU2
          Ft4vbBOa1r3OCfizpMm5cHiTmyTw+Rfx6bl7oWLrMStFR9YTAkAWhYvL0Q09SfSNHlhti+IEWJH5
          O8mjsm8wkKgRBtwGCa2VAxjtU5fA/OkOGk49aZDU6KuG0fwGN3Cea2rinpPzAkEAr+Pyil5x0e5C
          FqtV82FPgGr6AVbOmYCjDi41nJy/n9il8sL4FnuogiOkUIEaYyJQYJQa5SUfSvCs3M/wCIv3hQJB
          ALkb0Yt9lKZ6toOTz7pDT+U7lq+pAG6tzeQQdIDAesVVBZLlr7msOZZukbhhkVb4SWiac4jXpKne
          xXmGXrnPmFg=`
    jse.setPrivateKey(privateKey)

    // 解密加密过的字符串
    let decrypted = jse.decrypt(result)
    // 打印结果
    console.log("解密：", decrypted)

  </script>
</body>

</html>
```

