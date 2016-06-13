local C = {}
PWM = C
require "Object"
C = Object:new()
StopWatch = require "StopWatch"
C.period = 0
C.onTime = 0.0
C.onFoo = nil
C.offFoo = nil
C.OutStatus = 0
C.stopWatch1= StopWatch:new()
function C:new(o)
	local res = o or {}
	setmetatable(res, self)
	self.__index = self
	self.stopWatch1:start()
	return res
end
function C:setFunctions(OnFunctionAdd,OffFunctionAdd)	
	self.onFoo = OnFunctionAdd
	self.offFoo = OffFunctionAdd
end
function C:setPeriod(PeriodTimeSec)
	if PeriodTimeSec < 10 then
		self.period = 10
	else
		self.period = PeriodTimeSec
	end
	self:main()
end
function C:setDutyCycle(DutyCyclePercent)
	self.onTime = (DutyCyclePercent*self.period)
    if self.stopWatch1:elapsed() > self.onTime then
      self.stopWatch1:start()
    end
    self:main()
end
function C:callOnOff(val)
	if val ~= self.OutStatus then
		if val == 0 then
            self.OutStatus = 0
			self.offFoo()
        else
            self.OutStatus = 1
			self.onFoo()
		end
	end
end
function C:main(timeSinceLastCallMS)
	local time = self.stopWatch1:elapsed()
	if time >= self.period then
		self.stopWatch1:start()
		
		time = 0
	end
	if time < self.onTime then
		self:callOnOff(1)
    else
		self:callOnOff(0)
	end	
end
return C