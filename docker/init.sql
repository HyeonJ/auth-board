CREATE TABLE IF NOT EXISTS member (
    id         BIGINT       AUTO_INCREMENT PRIMARY KEY,
    email      VARCHAR(100) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    nickname   VARCHAR(30)  NOT NULL,
    role       VARCHAR(20)  NOT NULL DEFAULT 'USER',
    created_at DATETIME     NOT NULL DEFAULT NOW(),
    CONSTRAINT UQ_member_email UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS post (
    id         BIGINT       AUTO_INCREMENT PRIMARY KEY,
    title      VARCHAR(100) NOT NULL,
    content    TEXT         NOT NULL,
    member_id  BIGINT       NOT NULL,
    created_at DATETIME     NOT NULL DEFAULT NOW(),
    updated_at DATETIME     NOT NULL DEFAULT NOW(),
    CONSTRAINT FK_post_member FOREIGN KEY (member_id) REFERENCES member (id),
    INDEX IX_post_member_id (member_id),
    INDEX IX_post_created_at (created_at DESC)
);

CREATE TABLE IF NOT EXISTS refresh_token (
    id         BIGINT       AUTO_INCREMENT PRIMARY KEY,
    member_id  BIGINT       NOT NULL,
    token      VARCHAR(500) NOT NULL,
    expires_at DATETIME     NOT NULL,
    created_at DATETIME     NOT NULL DEFAULT NOW(),
    CONSTRAINT FK_refresh_token_member FOREIGN KEY (member_id) REFERENCES member (id),
    CONSTRAINT UQ_refresh_token_member_id UNIQUE (member_id)
);
