## HTTP、TCP协议

### 长链接

http/1.1 只要建立连接就能一次性发送请求资源了

### 管线化

请求是并行的，Chrome 6个，IE6 2个

## URI 和 URL

### URI

URI(Uniform Resource Identifier)是统一资源标识符,在某个规则下能把这个资源独一无二标示出来，比如人的身份证号

* Uniform 不用根据上下文来识别资源指定的访问方式
* Resource 可以标识的任何东西
* Identifier 表示可标识的对象

### URL

统一资源定位符，表示资源的地点，URL时使用浏览器访问WEB页面时需要输入的网页地址

* Uniform 不用根据上下文来识别资源指定的访问方式
* Resource 可以标识的任何东西
* Location 定位

## HTTP

### 请求报文

请求行 + 请求头 + 请求体

#### 方法

* Restful 风格 =》 get获取 / post增加 / put增加 / delete删除        /user
* options preflight 预发射 =》 跨域问题（前端）

### 响应报文

响应行 + 响应头 + 响应体

* 响应行：协议版本/状态吗/状态短语

## 状态吗

### 2XX 成功

* 200(OK 客户端发过来的数据被正常处理
* 204(Not Content 正常响应，没有实体
* 206(Partial Content 范围请求，返回部分数据，响应报文中由Content-Range指定实体内容

### 3XX 重定向

* 301(Moved Permanently) 永久重定向
* 302(Found) 临时重定向，规范要求方法名不变，但是都会改变
* 303(See Other) 和302类似，但必须用GET方法
* 304(Not Modified) 状态未改变 配合(If-Match、If-Modified-Since、If-None_Match、If-Range、If-Unmodified-Since)
* 307(Temporary Redirect) 临时重定向，不该改变请求方法

### 4XX 客户端错误

* 400(Bad Request) 请求报文语法错误
* 401 (unauthorized) 需要认证
* 403(Forbidden) 服务器拒绝访问对应的资源
* 404(Not Found) 服务器上无法找到资源

### 5XX 服务器端错误

* 500(Internal Server Error)服务器故障
* 503(Service Unavailable) 服务器处于超负载或正在停机维护

## 首部

* Accept-Encoding: gzip, deflate, br
* Accept-Language: zh-CN;q=1,zh;q=0.9,en;q=0.8
