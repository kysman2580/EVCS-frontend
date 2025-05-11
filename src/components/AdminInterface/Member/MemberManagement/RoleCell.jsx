import React, { useState } from 'react';
import axios from 'axios';
import {
    RoleCellContainer,
    LoadingIndicator,
    OptionsContainer,
    RoleButton
} from './RoleCell.styles';

const RoleCell = ({ member, onRoleChange }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRoleClick = () => {
        setShowOptions(!showOptions);
    };

    const changeRole = async (newRole) => {
        if (member.role === newRole) {
            setShowOptions(false);
            return;
        }

        try {
            setLoading(true);
            // API 호출 시 쿠키와 인증 정보를 함께 보냄
            await axios.put(`http://localhost:80/api/admin/management/${member.memberNo}/role`,
                { role: newRole },
                { withCredentials: true }  // 쿠키를 포함시킴
            );
            // 성공 시 상위 컴포넌트에 알림
            onRoleChange(member.memberNo, newRole);
        } catch (error) {
            console.error('권한 변경 실패:', error);
            alert('권한 변경에 실패했습니다.');
        } finally {
            setLoading(false);
            setShowOptions(false);
        }
    };

    return (
        <RoleCellContainer onClick={handleRoleClick}>
            {member.role}
            {loading && <LoadingIndicator>(처리 중...)</LoadingIndicator>}

            {showOptions && (
                <OptionsContainer>
                    <RoleButton
                        onClick={(e) => { e.stopPropagation(); changeRole('USER'); }}
                        className={member.role === 'USER' ? 'active' : ''}
                    >
                        USER
                    </RoleButton>
                    <RoleButton
                        onClick={(e) => { e.stopPropagation(); changeRole('ADMIN'); }}
                        className={member.role === 'ADMIN' ? 'active' : ''}
                    >
                        ADMIN
                    </RoleButton>
                </OptionsContainer>
            )}
        </RoleCellContainer>
    );
};

export default RoleCell;