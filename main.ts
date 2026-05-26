/**
 * 手柄控制部分相关程序
 */
function 对齐T线 (速度: number) {
    对齐T线变量 = 0
    while (true) {
        PlanetX_Basic.Trackbit_get_state_value()
        if (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.One, PlanetX_Basic.TrackbitType.State_0) && PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Four, PlanetX_Basic.TrackbitType.State_0)) {
            控制两个轮子(速度, 速度)
            对齐T线变量 = 1
        } else if (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.One, PlanetX_Basic.TrackbitType.State_0)) {
            控制两个轮子(速度, 0 - 速度)
            对齐T线变量 = 0
        } else if (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.One, PlanetX_Basic.TrackbitType.State_0)) {
            控制两个轮子(0 - 速度, 速度)
            对齐T线变量 = 0
        } else {
            if (对齐T线变量 == 1) {
                控制两个轮子(0, 0)
                break;
            } else {
                控制两个轮子(0 - 速度, 0 - 速度)
            }
        }
    }
}
function 升到最高等待 () {
    nezhaV2.setServoSpeed(40)
    nezhaV2.motorSpeed(NezhaV2MotorPostion.M4, NezhaV2MovementDirection.CW, 升降台默认升高角度, NezhaV2SportsMode.Degree)
    升降台当前角度 = 0
    basic.pause(1000)
}
function 收集火种1 () {
    basic.pause(1000)
    走距离_相对角度控制(5)
    抓紧爪子()
    basic.pause(2000)
    升到最高()
    走距离_相对角度控制(32)
    启动电机直到(20, 20, 4, 1)
    走距离_相对角度控制(4)
    basic.pause(100)
    转弯(20, 0)
    巡线时间(1, 12)
    左右看路口(0, 20, 18)
    松开爪子()
    basic.pause(1000)
    走距离_相对角度控制(-5)
    转弯(20, -20)
    降到底部等待()
}
function 机械抓张开调整 () {
    if (!(调整中)) {
        nezhaV2.nezha2MotorSpeedCtrolExport(NezhaV2MotorPostion.M3, 20)
        调整中 = 1
    } else {
        nezhaV2.nezha2MotorSpeedCtrolExport(NezhaV2MotorPostion.M3, 0)
        调整中 = 0
    }
}
function 转向_角度控制 (度数: number) {
    nezhaV2.servoRelativePostionReset(NezhaV2MotorPostion.M1)
    nezhaV2.servoRelativePostionReset(NezhaV2MotorPostion.M2)
    临时速度 = 20
    while (Math.abs(nezhaV2.readServoRelativePostion(NezhaV2MotorPostion.M1)) < 4050 / 1800 * Math.abs(度数)) {
        临时_速度 = 1 * (Math.abs(nezhaV2.readServoRelativePostion(NezhaV2MotorPostion.M1)) - Math.abs(nezhaV2.readServoRelativePostion(NezhaV2MotorPostion.M2)))
        if (度数 > 0) {
            nezhaV2.setSpeedfLeftRightWheel(临时速度 - 临时_速度, 0 - (临时速度 + 临时_速度))
        } else {
            nezhaV2.setSpeedfLeftRightWheel(0 - (临时速度 - 临时_速度), 临时速度 + 临时_速度)
        }
    }
    nezhaV2.setSpeedfLeftRightWheel(0, 0)
    if (度数 > 0) {
        nezhaV2.motorSpeed(NezhaV2MotorPostion.M1, NezhaV2MovementDirection.CW, 2, NezhaV2SportsMode.Degree)
        nezhaV2.motorSpeed(NezhaV2MotorPostion.M2, NezhaV2MovementDirection.CW, 2, NezhaV2SportsMode.Degree)
    } else {
        nezhaV2.motorSpeed(NezhaV2MotorPostion.M1, NezhaV2MovementDirection.CCW, 2, NezhaV2SportsMode.Degree)
        nezhaV2.motorSpeed(NezhaV2MotorPostion.M2, NezhaV2MovementDirection.CCW, 2, NezhaV2SportsMode.Degree)
    }
}
function 原石归位 () {
    走距离_相对角度控制(18)
    抓紧爪子()
    basic.pause(1000)
    升到最高等待()
    basic.pause(1000)
    走距离_相对角度控制(26)
    摆动找线()
    巡线时间(0.5, -1)
    左右看路口(1, 20, 自动_拐角走过路口的距离)
    转弯(20, -20)
    左右看路口(0, 20, 0)
    对齐T线(10)
    走距离_相对角度控制(自动_T字走过路口的距离)
    if (颜色 == 1) {
        原石放入红区()
    } else {
        原石放入蓝区()
    }
}
function 摆动找线 () {
    初始时间 = input.runningTime()
    while (input.runningTime() - 初始时间 < 0.3) {
        PlanetX_Basic.Trackbit_get_state_value()
        if (PlanetX_Basic.TrackbitState(PlanetX_Basic.TrackbitStateType.Tracking_State_1)) {
            break;
        }
        控制两个轮子(20, -20)
    }
    初始时间 = input.runningTime()
    while (input.runningTime() - 初始时间 < 0.6) {
        PlanetX_Basic.Trackbit_get_state_value()
        if (PlanetX_Basic.TrackbitState(PlanetX_Basic.TrackbitStateType.Tracking_State_1)) {
            break;
        }
        控制两个轮子(-20, 20)
    }
    控制两个轮子(0, 0)
}
function 降到底部等待 () {
    nezhaV2.setServoSpeed(40)
    nezhaV2.motorSpeed(NezhaV2MotorPostion.M4, NezhaV2MovementDirection.CCW, 升降台默认升高角度, NezhaV2SportsMode.Degree)
    升降台当前角度 = 1
    basic.pause(1000)
}
function 抓子收放 () {
    if (PlanetX_Basic.get_Attention_Value(PlanetX_Basic.value_level.Cir)) {
        nezhaV2.nezha2MotorSpeedCtrolExport(NezhaV2MotorPostion.M3, 30)
    } else {
        if (PlanetX_Basic.get_Attention_Value(PlanetX_Basic.value_level.Squ)) {
            nezhaV2.nezha2MotorSpeedCtrolExport(NezhaV2MotorPostion.M3, -30)
        } else {
            nezhaV2.nezha2MotorStop(NezhaV2MotorPostion.M3)
        }
    }
}
function 收集火种2 () {
    let 自动_火种2前进距离 = 0
    巡线时间(1, 12)
    左右看路口(1, 20, 自动_火种2前进距离)
    抓紧爪子()
    basic.pause(2000)
    升到最高()
    basic.pause(500)
    走距离_相对角度控制(-5)
    basic.pause(500)
    转弯(-20, 20)
    basic.pause(500)
    巡线时间(1, 12)
    左右看路口(0, 20, 18)
    松开爪子()
    basic.pause(1000)
    走距离_相对角度控制(-10)
    降到底部等待()
}
function 初始化 () {
    默认走过的距离 = 15
    set_SP = 30
    set_PID_P = 10
    set_PID_I = 0
    set_PID_D = 1
    nezhaV2.runningMotorToeSpeed(NezhaV2MotorPostionLeft.A, NezhaV2MotorPostionRight.B)
    nezhaV2.SetMotorOneRotateRevolution(19.6, NezhaV2Uint.cm)
    颜色 = 0
    升降台当前角度 = 0
    升降台默认升高角度 = 640
    机械抓当前角度 = 0
    机械爪_角度_倍数 = 5
    调整中 = 0
    平台当前高度 = 0
    爪子角度 = 0
    爪子状态1 = 0
    basic.pause(500)
}
function 颜色识别启动 () {
    while (true) {
        if (PlanetX_Basic.checkColor(PlanetX_Basic.ColorList.red)) {
            颜色 = 1
            basic.showNumber(颜色)
            break;
        } else if (PlanetX_Basic.checkColor(PlanetX_Basic.ColorList.blue)) {
            颜色 = 2
            basic.showNumber(颜色)
            break;
        } else {
            颜色 = 0
            basic.showNumber(颜色)
        }
    }
}
// 按键A：针对具体模式执行相关程序
input.onButtonPressed(Button.A, function () {
    按键A进入调试()
})
function 原石放入红区 () {
    转向_角度控制(自动_右转到红框的角度)
    红蓝校准()
    basic.pause(500)
    走距离_相对角度控制(0 - 自动_红框处后退的距离)
    basic.pause(500)
    降到底部等待()
    松开爪子()
    升到最高等待()
    basic.pause(1000)
    转向_角度控制(0 - 自动_红框转到火种的角度)
    降到底部等待()
}
function 自动运行 () {
    自动阶段参数设置()
    原石归位()
    收集火种1()
    收集火种2()
}
function 走距离_相对角度控制 (距离: number) {
    nezhaV2.servoRelativePostionReset(NezhaV2MotorPostion.M1)
    nezhaV2.servoRelativePostionReset(NezhaV2MotorPostion.M2)
    临时速度 = 20
    while (17.4 * Math.abs(nezhaV2.readServoRelativePostion(NezhaV2MotorPostion.M1)) / 360 < Math.abs(距离)) {
        临时_速度 = 1 * (Math.abs(nezhaV2.readServoRelativePostion(NezhaV2MotorPostion.M1)) - Math.abs(nezhaV2.readServoRelativePostion(NezhaV2MotorPostion.M2)))
        if (距离 > 0) {
            nezhaV2.setSpeedfLeftRightWheel(临时速度 - 临时_速度, 临时速度 + 临时_速度)
        } else {
            nezhaV2.setSpeedfLeftRightWheel(0 - (临时速度 - 临时_速度), 0 - (临时速度 + 临时_速度))
        }
    }
    nezhaV2.setSpeedfLeftRightWheel(0, 0)
}
function 按键A进入调试 () {
    if (model == 0) {
        // 颜色识别函数，自动阶段识别卡片颜色
        颜色识别启动()
        if (颜色 == 1 || 颜色 == 2) {
            自动运行()
        }
    } else if (model == 1) {
        手柄控制()
    } else if (model == 2) {
        // 调整模式，升降台上升控制
        升降台上升调整()
    } else if (model == 3) {
        // 调整模式，升降台下降控制
        升降台下降调整()
    } else if (model == 4) {
        // 调整模式，机械抓张开控制
        机械抓张开调整()
    } else if (model == 5) {
        // 调整模式，机械抓合拢控制
        机械抓合拢调整()
    }
}
function 平台上下 () {
    if (PlanetX_Basic.get_Attention_Value(PlanetX_Basic.value_level.X)) {
        nezhaV2.nezha2MotorSpeedCtrolExport(NezhaV2MotorPostion.M4, 50)
    } else {
        if (PlanetX_Basic.get_Attention_Value(PlanetX_Basic.value_level.Tri)) {
            nezhaV2.nezha2MotorSpeedCtrolExport(NezhaV2MotorPostion.M4, -50)
        } else {
            nezhaV2.nezha2MotorStop(NezhaV2MotorPostion.M4)
        }
    }
}
function 走时间 (左轮速度: number, 右轮速度: number, 时间_s: number) {
    控制两个轮子(左轮速度, 右轮速度)
    basic.pause(时间_s * 1000)
    控制两个轮子(0, 0)
}
function 抓紧爪子 () {
    nezhaV2.setServoSpeed(100)
    nezhaV2.motorSpeed(NezhaV2MotorPostion.M3, NezhaV2MovementDirection.CCW, 360 * 机械爪_角度_倍数, NezhaV2SportsMode.Degree)
    机械抓当前角度 = 1
    basic.pause(200)
}
function 升降台下降调整 () {
    if (!(调整中)) {
        nezhaV2.nezha2MotorSpeedCtrolExport(NezhaV2MotorPostion.M4, -20)
        调整中 = 1
    } else {
        nezhaV2.nezha2MotorSpeedCtrolExport(NezhaV2MotorPostion.M4, 0)
        调整中 = 0
    }
}
function 手柄控制 () {
    手柄加减速调整幅度 = 10
    手柄速度_min = 20
    手柄速度_max = 50
    手柄速度_now = 0
    手柄速度_left = 0
    手柄速度_right = 0
    while (true) {
        if (PlanetX_Basic.get_Attention_Value(PlanetX_Basic.value_level.UP)) {
            匀加速()
            手柄速度_left = -1 * 手柄速度_now
            手柄速度_right = -1 * 手柄速度_now
            nezhaV2.setSpeedfLeftRightWheel(手柄速度_left, 手柄速度_right)
        } else if (PlanetX_Basic.get_Attention_Value(PlanetX_Basic.value_level.DOWN)) {
            匀加速()
            手柄速度_left = 手柄速度_now
            手柄速度_right = 手柄速度_now
            nezhaV2.setSpeedfLeftRightWheel(手柄速度_left, 手柄速度_right)
        } else if (PlanetX_Basic.get_Attention_Value(PlanetX_Basic.value_level.LEFT)) {
            匀加速()
            手柄速度_left = -1 * 手柄速度_now
            手柄速度_right = 手柄速度_now
            nezhaV2.setSpeedfLeftRightWheel(手柄速度_left, 手柄速度_right)
        } else if (PlanetX_Basic.get_Attention_Value(PlanetX_Basic.value_level.RIGHT)) {
            匀加速()
            手柄速度_left = 手柄速度_now
            手柄速度_right = -1 * 手柄速度_now
            nezhaV2.setSpeedfLeftRightWheel(手柄速度_left, 手柄速度_right)
        } else if (PlanetX_Basic.get_Attention_Value(PlanetX_Basic.value_level.Left2)) {
            nezhaV2.setSpeedfLeftRightWheel(-15, 15)
        } else if (PlanetX_Basic.get_Attention_Value(PlanetX_Basic.value_level.Right2)) {
            nezhaV2.setSpeedfLeftRightWheel(15, -15)
        } else if (PlanetX_Basic.get_Attention_Value(PlanetX_Basic.value_level.Left1)) {
            nezhaV2.setSpeedfLeftRightWheel(18, 18)
        } else if (PlanetX_Basic.get_Attention_Value(PlanetX_Basic.value_level.Right1)) {
            nezhaV2.setSpeedfLeftRightWheel(-18, -18)
        } else {
            匀减速()
            nezhaV2.setSpeedfLeftRightWheel(手柄速度_left, 手柄速度_right)
        }
        抓子收放()
        平台上下()
    }
}
function 启动电机直到 (左轮速度: number, 右轮速度: number, 光电编号: number, 黑白: number) {
    PlanetX_Basic.Trackbit_get_state_value()
    if (黑白 == 1) {
        if (光电编号 == 1) {
            while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.One, PlanetX_Basic.TrackbitType.State_0)) {
                控制两个轮子(左轮速度, 右轮速度)
                PlanetX_Basic.Trackbit_get_state_value()
            }
        } else if (光电编号 == 2) {
            while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Two, PlanetX_Basic.TrackbitType.State_0)) {
                控制两个轮子(左轮速度, 右轮速度)
                PlanetX_Basic.Trackbit_get_state_value()
            }
        } else if (光电编号 == 3) {
            while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Three, PlanetX_Basic.TrackbitType.State_0)) {
                控制两个轮子(左轮速度, 右轮速度)
                PlanetX_Basic.Trackbit_get_state_value()
            }
        } else if (光电编号 == 4) {
            while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Four, PlanetX_Basic.TrackbitType.State_0)) {
                控制两个轮子(左轮速度, 右轮速度)
                PlanetX_Basic.Trackbit_get_state_value()
            }
        }
    } else if (黑白 == 0) {
        if (光电编号 == 1) {
            while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.One, PlanetX_Basic.TrackbitType.State_1)) {
                控制两个轮子(左轮速度, 右轮速度)
                PlanetX_Basic.Trackbit_get_state_value()
            }
        } else if (光电编号 == 2) {
            while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Two, PlanetX_Basic.TrackbitType.State_1)) {
                控制两个轮子(左轮速度, 右轮速度)
                PlanetX_Basic.Trackbit_get_state_value()
            }
        } else if (光电编号 == 3) {
            while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Three, PlanetX_Basic.TrackbitType.State_1)) {
                控制两个轮子(左轮速度, 右轮速度)
                PlanetX_Basic.Trackbit_get_state_value()
            }
        } else if (光电编号 == 4) {
            while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Four, PlanetX_Basic.TrackbitType.State_1)) {
                控制两个轮子(左轮速度, 右轮速度)
                PlanetX_Basic.Trackbit_get_state_value()
            }
        }
    }
    控制两个轮子(0, 0)
}
// 按键B，切换不同的模式
// 
// 0：自动阶段
// 1：手柄遥控
// 2：升降梯上升调试
// 3：升降梯下降调试
// 4：爪子张开调试
// 5：爪子收拢调试
input.onButtonPressed(Button.B, function () {
    按键B选择模式()
})
function 匀加速 () {
    if (手柄速度_now < 手柄速度_max) {
        if (手柄速度_now < 手柄速度_min) {
            手柄速度_now = 手柄速度_min
        } else {
            手柄速度_now += 手柄加减速调整幅度
        }
    }
}
function 机械抓合拢调整 () {
    if (!(调整中)) {
        nezhaV2.nezha2MotorSpeedCtrolExport(NezhaV2MotorPostion.M3, -20)
        调整中 = 1
    } else {
        nezhaV2.nezha2MotorSpeedCtrolExport(NezhaV2MotorPostion.M3, 0)
        调整中 = 0
    }
}
/**
 * 机械抓和升降台控制程序
 */
function 松开爪子 () {
    nezhaV2.setServoSpeed(100)
    nezhaV2.motorSpeed(NezhaV2MotorPostion.M3, NezhaV2MovementDirection.CW, 360 * 机械爪_角度_倍数, NezhaV2SportsMode.Degree)
    机械抓当前角度 = 0
    basic.pause(200)
}
/**
 * 小车运行基本程序
 */
function 控制两个轮子 (左轮速度: number, 右轮速度: number) {
    nezhaV2.setSpeedfLeftRightWheel(左轮速度, 右轮速度)
}
function 升到最高 () {
    nezhaV2.setServoSpeed(50)
    nezhaV2.motorSpeed(NezhaV2MotorPostion.M4, NezhaV2MovementDirection.CW, 升降台默认升高角度, NezhaV2SportsMode.Degree)
    升降台当前角度 = 1
}
/**
 * 自动运行部分相关程序
 */
function 红蓝校准 () {
    while (true) {
        let 蓝白阈值 = 0
        光电1 = PlanetX_Basic.TrackbitgetGray(PlanetX_Basic.TrackbitChannel.One)
        光电4 = PlanetX_Basic.TrackbitgetGray(PlanetX_Basic.TrackbitChannel.Four)
        if (光电1 > 蓝白阈值 && 光电4 > 蓝白阈值) {
            if (光电1 < 光电4 - 20) {
                nezhaV2.setSpeedfLeftRightWheel(10, -10)
            } else if (光电4 < 光电1 - 20) {
                nezhaV2.setSpeedfLeftRightWheel(-10, 10)
            } else {
                break;
            }
        } else if (光电1 < 蓝白阈值 && 光电4 < 蓝白阈值) {
            nezhaV2.setSpeedfLeftRightWheel(10, 10)
        } else if (光电1 < 蓝白阈值 && 光电4 > 蓝白阈值) {
            nezhaV2.setSpeedfLeftRightWheel(10, -10)
        } else if (光电1 > 蓝白阈值 && 光电4 < 蓝白阈值) {
            nezhaV2.setSpeedfLeftRightWheel(-10, 10)
        }
    }
    nezhaV2.setSpeedfLeftRightWheel(0, 0)
}
function 双光电巡线 (速度: number, pid_P: number, pid_I: number, pid_D: number) {
    if (速度 == -1) {
        速度 = set_SP
    }
    if (pid_P == -1) {
        pid_P = set_PID_P
    }
    if (pid_I == -1) {
        pid_I = set_PID_I
    }
    if (pid_D == -1) {
        pid_D = set_PID_D
    }
    pid_err = 0
    sp_L = 0
    sp_R = 0
    PlanetX_Basic.Trackbit_get_state_value()
    pid_err = PlanetX_Basic.TrackbitgetGray(PlanetX_Basic.TrackbitChannel.Two) - PlanetX_Basic.TrackbitgetGray(PlanetX_Basic.TrackbitChannel.Three)
    pid_all_err = pid_all_err + pid_err
    pid_P_pwm = pid_P * (pid_err * 0.01)
    pid_I_pwm = pid_I * (pid_all_err * 0.001)
    pid_D_pwm = pid_D * ((pid_err - pid_last_err) * 0.01)
    pid_pwm = pid_P_pwm + (pid_I_pwm + pid_D_pwm)
    pid_last_err = pid_err
    sp_L = 速度 - pid_pwm
    sp_R = 速度 + pid_pwm
    if (0 > sp_L) {
        sp_L = 0
    }
    if (0 > sp_R) {
        sp_R = 0
    }
    控制两个轮子(sp_L, sp_R)
}
function 按键B选择模式 () {
    nezhaV2.nezha2MotorSpeedCtrolExport(NezhaV2MotorPostion.M3, 0)
    nezhaV2.nezha2MotorSpeedCtrolExport(NezhaV2MotorPostion.M4, 0)
    调整中 = 0
    if (model == 0) {
        model = 1
        basic.showLeds(`
            # . . . #
            # # . # #
            # # # # #
            # # . # #
            . # . # .
            `)
    } else if (model == 1) {
        model = 2
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
    } else if (model == 2) {
        model = 3
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else if (model == 3) {
        model = 4
        basic.showLeds(`
            . # . # .
            . # . # .
            . # . # .
            . # . # .
            # . . . #
            `)
    } else if (model == 4) {
        model = 5
        basic.showLeds(`
            # . . . #
            # . . . #
            # . . . #
            # . . . #
            # # . # #
            `)
    } else if (model == 5) {
        model = 0
        basic.showLeds(`
            . . . . .
            . # . # .
            # # # # #
            # . . . .
            . . . . .
            `)
    }
}
function 左右看路口 (模式: number, 速度: number, 走过路口的距离: number) {
    PlanetX_Basic.Trackbit_get_state_value()
    for (let index = 0; index < 4; index++) {
        双光电巡线(速度, 40, -1, -1)
        PlanetX_Basic.Trackbit_get_state_value()
    }
    for (let index = 0; index < 1; index++) {
        if (模式 == -1) {
            while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.One, PlanetX_Basic.TrackbitType.State_0)) {
                双光电巡线(速度, -1, -1, -1)
                PlanetX_Basic.Trackbit_get_state_value()
            }
        } else if (模式 == 1) {
            while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Four, PlanetX_Basic.TrackbitType.State_0)) {
                双光电巡线(速度, -1, -1, -1)
                PlanetX_Basic.Trackbit_get_state_value()
            }
        } else if (模式 == 0) {
            while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.One, PlanetX_Basic.TrackbitType.State_0) && PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Four, PlanetX_Basic.TrackbitType.State_0)) {
                双光电巡线(速度, -1, -1, -1)
                PlanetX_Basic.Trackbit_get_state_value()
            }
        }
    }
    走距离_相对角度控制(走过路口的距离)
}
function 自动阶段参数设置 () {
    自动_拐角走过路口的距离 = 10.4
    自动_T字走过路口的距离 = 18
    自动_右转到红框的角度 = 86.5
    自动_左转到蓝框的角度 = 86.5
    自动_红框处后退的距离 = 2.5
    自动_蓝框处后退的距离 = 2
    自动_红框转到火种的角度 = 84.5
}
function 升降台上升调整 () {
    if (!(调整中)) {
        nezhaV2.nezha2MotorSpeedCtrolExport(NezhaV2MotorPostion.M4, 20)
        调整中 = 1
    } else {
        nezhaV2.nezha2MotorSpeedCtrolExport(NezhaV2MotorPostion.M4, 0)
        调整中 = 0
    }
}
function 匀减速 () {
    if (手柄速度_now > 手柄速度_min) {
        手柄速度_now += 手柄加减速调整幅度 * -1
    } else {
        手柄速度_now = 0
    }
    if (手柄速度_left < 0) {
        手柄速度_left = -1 * 手柄速度_now
    } else {
        手柄速度_left = 手柄速度_now
    }
    if (手柄速度_right < 0) {
        手柄速度_right = -1 * 手柄速度_now
    } else {
        手柄速度_right = 手柄速度_now
    }
}
function 降到底部 () {
    nezhaV2.setServoSpeed(50)
    nezhaV2.motorSpeed(NezhaV2MotorPostion.M4, NezhaV2MovementDirection.CCW, 升降台默认升高角度, NezhaV2SportsMode.Degree)
    升降台当前角度 = 0
}
function 原石放入蓝区 () {
    let 自动_蓝框转到火种的角度 = 0
    转向_角度控制(0 - 自动_左转到蓝框的角度)
    红蓝校准()
    basic.pause(500)
    走距离_相对角度控制(0 - 自动_蓝框处后退的距离)
    basic.pause(500)
    降到底部等待()
    松开爪子()
    升到最高等待()
    basic.pause(1000)
    转向_角度控制(自动_蓝框转到火种的角度)
    降到底部等待()
}
function 巡线时间 (时间_秒: number, pid_P: number) {
    PlanetX_Basic.Trackbit_get_state_value()
    if (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Two, PlanetX_Basic.TrackbitType.State_0) && PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Three, PlanetX_Basic.TrackbitType.State_0)) {
        if (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.One, PlanetX_Basic.TrackbitType.State_1)) {
            启动电机直到(0, 30, 3, 1)
        } else if (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Four, PlanetX_Basic.TrackbitType.State_1)) {
            启动电机直到(30, 0, 2, 1)
        }
    }
    if (pid_P == -1) {
        pid_P = set_PID_P
    }
    if (时间_秒 > 0) {
        控制两个轮子(50, 50)
        初始时间 = input.runningTime()
        while (input.runningTime() - 初始时间 < 时间_秒 * 1000) {
            双光电巡线(40, pid_P, -1, -1)
        }
        控制两个轮子(0, 0)
    }
}
function 转弯 (左轮速度: number, 右轮速度: number) {
    PlanetX_Basic.Trackbit_get_state_value()
    if (左轮速度 <= 右轮速度) {
        while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.One, PlanetX_Basic.TrackbitType.State_0)) {
            控制两个轮子(左轮速度, 右轮速度)
            PlanetX_Basic.Trackbit_get_state_value()
        }
        while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.One, PlanetX_Basic.TrackbitType.State_1)) {
            控制两个轮子(左轮速度, 右轮速度)
            PlanetX_Basic.Trackbit_get_state_value()
        }
        while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Two, PlanetX_Basic.TrackbitType.State_0)) {
            控制两个轮子(左轮速度, 右轮速度)
            PlanetX_Basic.Trackbit_get_state_value()
        }
        while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Three, PlanetX_Basic.TrackbitType.State_0)) {
            控制两个轮子(左轮速度, 右轮速度)
            PlanetX_Basic.Trackbit_get_state_value()
        }
    } else if (左轮速度 > 右轮速度) {
        while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Four, PlanetX_Basic.TrackbitType.State_0)) {
            控制两个轮子(左轮速度, 右轮速度)
            PlanetX_Basic.Trackbit_get_state_value()
        }
        while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Four, PlanetX_Basic.TrackbitType.State_1)) {
            控制两个轮子(左轮速度, 右轮速度)
            PlanetX_Basic.Trackbit_get_state_value()
        }
        while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Three, PlanetX_Basic.TrackbitType.State_0)) {
            控制两个轮子(左轮速度, 右轮速度)
            PlanetX_Basic.Trackbit_get_state_value()
        }
        while (PlanetX_Basic.TrackbitChannelState(PlanetX_Basic.TrackbitChannel.Two, PlanetX_Basic.TrackbitType.State_0)) {
            控制两个轮子(左轮速度, 右轮速度)
            PlanetX_Basic.Trackbit_get_state_value()
        }
    }
    控制两个轮子(0, 0)
}
let 自动_蓝框处后退的距离 = 0
let 自动_左转到蓝框的角度 = 0
let pid_pwm = 0
let pid_last_err = 0
let pid_D_pwm = 0
let pid_I_pwm = 0
let pid_P_pwm = 0
let pid_all_err = 0
let sp_R = 0
let sp_L = 0
let pid_err = 0
let pid_D = 0
let pid_I = 0
let pid_P = 0
let 速度 = 0
let 光电4 = 0
let 光电1 = 0
let 手柄速度_right = 0
let 手柄速度_left = 0
let 手柄速度_now = 0
let 手柄速度_max = 0
let 手柄速度_min = 0
let 手柄加减速调整幅度 = 0
let 自动_红框转到火种的角度 = 0
let 自动_红框处后退的距离 = 0
let 自动_右转到红框的角度 = 0
let 爪子状态1 = 0
let 爪子角度 = 0
let 平台当前高度 = 0
let 机械爪_角度_倍数 = 0
let 机械抓当前角度 = 0
let set_PID_D = 0
let set_PID_I = 0
let set_PID_P = 0
let set_SP = 0
let 默认走过的距离 = 0
let 初始时间 = 0
let 颜色 = 0
let 自动_T字走过路口的距离 = 0
let 自动_拐角走过路口的距离 = 0
let 临时_速度 = 0
let 临时速度 = 0
let 调整中 = 0
let 升降台当前角度 = 0
let 升降台默认升高角度 = 0
let 对齐T线变量 = 0
let model = 0
// 初始化设置一些参数
初始化()
model = 0
basic.showLeds(`
    . . . . .
    . # . # .
    # # # # #
    # . . . .
    . . . . .
    `)
