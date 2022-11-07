"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var mocha_1 = require("mocha");
var typescript_1 = require("../../main/typescript");
var chai_1 = require("chai");
var mocha_2 = require("mocha");
var errorProbe = "<error>\n                <error-name>Error</error-name>\n                <error-message><![CDATA[Message]]></error-message>\n          </error>";
(0, mocha_1.describe)('xml query tests', function () {
    (0, mocha_2.it)('must handle the errorPrope correctly', function () {
        var xmlQuery = new typescript_1.XMLQuery(errorProbe);
        (0, chai_1.expect)(xmlQuery.querySelectorAll("error-name").isPresent());
        (0, chai_1.expect)(xmlQuery.querySelectorAll("error-name").textContent('')).eq('Error');
        (0, chai_1.expect)(xmlQuery.querySelectorAll("error-message").isPresent());
        (0, chai_1.expect)(xmlQuery.querySelectorAll("error-message").cDATAAsString).eq('Message');
    });
});
/*
          <error>
                <error-name>Error</error-name>
                <error-message><![CDATA[Message]]></error-message>
          </error>
 */ 
//# sourceMappingURL=XmlQueryTest.spec.js.map