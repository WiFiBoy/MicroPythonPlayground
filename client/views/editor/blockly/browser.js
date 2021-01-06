const Blockly = require('./lib/blockly_compressed');

Blockly.setLocale = function(locale) {
  Blockly.Msg = Object.assign(locale, Blockly.Msg);
  Blockly.Msg = Blockly.Msg();
}

Blockly.utils.getMessageArray_ = function () {
  return Blockly.Msg
}

Blockly.setLocale(require('./lib/zh-hant'));

Blockly.Blocks = Object.assign(Blockly.Blocks, require('./lib/blocks_compressed')(Blockly));

Blockly.Python = require('./lib/python_compressed')(Blockly);

//Blockly.Msg = require('./lib/en');

Blockly.CustomBlocks = 
  `
<xml>
  <category name="顯示" colour="30">
      <block type="wb_color"></block>
      <block type="wb_cls">
        <value name="COLOR">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
      <block type="wb_str">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">Hello</field>
          </shadow>
        </value>
        <value name="COLOR">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="X">
          <shadow type="math_number">
            <field name="NUM">20</field>
          </shadow>
        </value>
        <value name="Y">
          <shadow type="math_number">
            <field name="NUM">20</field>
          </shadow>
        </value>
        <value name="SIZE">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="wb_box">
        <value name="X">
          <shadow type="math_number">
            <field name="NUM">20</field>
          </shadow>
        </value>
        <value name="Y">
          <shadow type="math_number">
            <field name="NUM">20</field>
          </shadow>
        </value>
        <value name="WIDTH">
          <shadow type="math_number">
            <field name="NUM">20</field>
          </shadow>
        </value>
        <value name="HEIGHT">
          <shadow type="math_number">
            <field name="NUM">20</field>
          </shadow>
        </value>
        <value name="COLOR">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value></block>
        <block type="wb_line">
        <value name="X1">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="Y1">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="X2">
          <shadow type="math_number">
            <field name="NUM">200</field>
          </shadow>
        </value>
        <value name="Y2">
          <shadow type="math_number">
            <field name="NUM">200</field>
          </shadow>
        </value>
        <value name="COLOR">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="WIDTH">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value></block>
      <block type="wb_rgb">
        <value name="R">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="G">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="B">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
      <block type="wb32randcolor"></block>
  </category>
  <category name="按鍵" colour="60">
    <block type="wb_getK"></block>
    <block type="wb_getKey"></block>
    <block type="wb_getBothKey"></block>
    <block type="wb_wait_press"></block>
    <block type="wb_wait_relesed"></block>
  </category>
  <category name="聲音" colour="90">
    <block type="wb_sound_start"></block>
    <block type="wb_duty">
      <value name="DUTY">
        <shadow type="math_number">
          <field name="NUM">50</field>
        </shadow>
      </value>
    </block>
    <block type="wb_freq">
    <value name="FREQ">
        <shadow type="math_number">
          <field name="NUM">440</field>
        </shadow>
      </value>
    </block>
    <block type="wb_sound_close"></block>
    <block type="wb_tone_start"></block>
    <block type="wb_tone">
        <value name="PS">
          <shadow type="text">
            <field name="TEXT">CDEFG</field>
          </shadow>
        </value>
    </block>
    <block type="wb_tone_tempo">
      <value name="TEMPO">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </block>
    <block type="wb_tone_initduty">
      <value name="DUTY">
        <shadow type="math_number">
          <field name="NUM">20</field>
        </shadow>
      </value>
    </block>
    <block type="wb_tone_dutyd">
      <value name="DUTYD">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>
  </category>
  <category name="系統" colour="120">
      <block type="sleep">
        <value name="SEC">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value></block>
      <block type="wb32rand"></block>
      <block type="urandom_int">
          <value name="FROM">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
          <value name="TO">
            <shadow type="math_number">
              <field name="NUM">10</field>
            </shadow>
          </value>
      </block>
      <block type="LED_light"></block>
      <block type="set_Pin_output">
        <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">16</field>
        </shadow>
        </value>
      </block>
      <block type="set_Pin_input">
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">17</field>
        </shadow>
      </value>
      </block>
      <block type="wb_gyro_start"></block>
      <block type="wb_get_acc"></block>
      <block type="wb_get_gyro"></block>
      <block type="wb_get_mag"></block>
      <block type="wb_gyro_close"></block>

      <!--block type="set_Servo">
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
      </block>
      <block type="set_I2C"></block>
      <block type="set_SPI"></block>
      <block type="set_PWM"></block>
      <block type="variables_get"></block>
      <block type="variables_set"></block-->
  </category>
  <category name="通訊" colour="150">
    <block type="Wi_Fi_connect"></block>
    <block type="UDP_connect"></block>
    <block type="socket_send_to"></block>
    <block type="socket_recv_from"></block>
    <block type="tcp_ip"></block>
    <block type="start_WebServer"></block>
    <block type="read_Http"></block>
  </category>
  <category name="變數" custom="VARIABLE"  colour="180">
  </category>
  <category name="函式" custom="PROCEDURE" colour="210">
  </category>
  <category name="邏輯" colour="240">
        <block type="controls_if"></block>
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>
        <block type="logic_boolean"></block>
        <block type="logic_null"></block>
        <block type="logic_ternary"></block>
  </category>
  <category name="迴圈" colour="270">
    <block type="controls_repeat_ext">
      <value name="TIMES">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    <block type="controls_whileUntil"></block>
    <block type="controls_for">
      <value name="FROM">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="TO">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
      <value name="BY">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>
    <block type="controls_forEach"></block>
    <block type="controls_flow_statements"></block>
  </category>
  <category name="數學" colour="300">
      <block type="math_number"></block>
      <block type="math_arithmetic">
          <value name="A">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
          <value name="B">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value></block>
      <block type="math_single">
          <value name="NUM">
            <shadow type="math_number">
              <field name="NUM">9</field>
            </shadow>
          </value></block>
      <block type="math_trig">
          <value name="NUM">
            <shadow type="math_number">
              <field name="NUM">45</field>
            </shadow>
          </value></block>
      <block type="math_constant"></block>
      <block type="math_number_property">
          <value name="NUMBER_TO_CHECK">
            <shadow type="math_number">
              <field name="NUM">0</field>
            </shadow>
          </value></block>
      <block type="math_round">
          <value name="NUM">
            <shadow type="math_number">
              <field name="NUM">3.1</field>
            </shadow>
          </value></block>   
      <block type="math_modulo">
          <value name="DIVIDEND">
            <shadow type="math_number">
              <field name="NUM">64</field>
            </shadow>
          </value>
          <value name="DIVISOR">
            <shadow type="math_number">
              <field name="NUM">10</field>
            </shadow>
          </value></block>
  </category>
  <category name="列表" colour="330">
    <block type="lists_create_empty"></block>
    <block type="lists_create_with"></block>
    <block type="lists_repeat">
      <value name="NUM">
        <block type="math_number">
          <field name="NUM">5</field>
        </block>
      </value>
    </block>
    <block type="lists_length"></block>
    <block type="lists_isEmpty"></block>
    <block type="lists_indexOf"></block>
    <block type="lists_getIndex"></block>
    <block type="lists_setIndex"></block>
  </category>
  <category name="文字" colour="360">
      <block type="text"></block>
      <block type="text_print">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">Hello</field>
          </shadow>
        </value>
      </block>
      <block type="text_join"></block>
      <block type="text_append">
        <value name="TEXT">
          <shadow type="text"></shadow>
        </value>
      </block>
      <block type="text_length">
        <value name="VALUE">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_isEmpty">
        <value name="VALUE">
          <shadow type="text">
            <field name="TEXT"></field>
          </shadow>
        </value>
      </block>
  </category>
  <category name="小龜繪圖" colour="200">
      <block type="ttreset"></block>
      <block type="ttgo">
        <value name="LEN">
          <shadow type="math_number">
            <field name="NUM">50</field>
          </shadow>
        </value>
      </block>
      <block type="ttrot">
        <value name="ROT">
          <shadow type="math_number">
            <field name="NUM">90</field>
          </shadow>
        </value>
      </block>
      <block type="ttpos">
        <value name="X">
          <shadow type="math_number">
            <field name="NUM">120</field>
          </shadow>
        </value>
        <value name="Y">
          <shadow type="math_number">
            <field name="NUM">160</field>
          </shadow>
        </value>
      </block>
      <block type="ttpenup">
      </block>
      <block type="ttcolorwidth">
        <value name="COLOR">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="WIDTH">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
  </category>
  <!--category name="陀螺儀" colour="90">
    <block type="wb_gyro_start"></block>
    <block type="wb_get_acc"></block>
    <block type="wb_get_gyro"></block>
    <block type="wb_get_mag"></block>
    <block type="wb_gyro_close"></block>
  </category-->
  <category name="Tello四軸" colour="216">
    <block type="tello_connect">
      <value name="SSID">
        <shadow type="text">
          <field name="TEXT">TELLO-123456</field>
        </shadow>
      </value>
    </block>
    <block type="tello_takeoff"></block>
    <block type="tello_land"></block>
    <block type="tello_forward"></block>
    <block type="tello_backward"></block>
    <block type="tello_up"></block>
    <block type="tello_down"></block>
    <block type="tello_flip"></block>
    <block type="tello_battery"></block>
  </category>
  </xml>
  `

module.exports = Blockly;